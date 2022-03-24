import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { createRouter } from '~/creatRouter';
import { TRPCError } from '@trpc/server';
import {
  checkPassword,
  hashPassword,
  setFingerprintCookieAndSignJwt,
  sha256,
  uuidv4,
} from '~/utils/crypto';
import crypto from 'crypto';
import { serialize } from 'cookie';
import { FINGERPRINT_COOKIE_NAME } from '~/constants';
import { getCookie } from '~/utils';
import tokenGenerator from '~/libs/TokenGenerator';

export const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
});
export const UserUniqueInput = z.object({
  id: z.number(),
  email: z.string().email(),
});

export const UserCreateWhereInput = z.object({
  data: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(10),
  }),
});

export const UserLoginWhereInput = z.object({
  data: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(10),
  }),
});

export const RefreshTokenInput = z.object({
  data: z.object({
    refreshToken: z.string(),
    fingerPrintHash: z.string(),
  }),
});

export const userRouter = createRouter()
  .query('whoami', {
    async resolve({ ctx }) {
      if (!ctx.user) {
        return null;
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.user.id,
        },
        select: defaultUserSelect,
      });
      if (!user) {
        return null;
      }
      return user;
    },
  })
  .query('all', {
    async resolve({ ctx }) {
      if (!ctx.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }
      return ctx.prisma.user.findMany({
        select: defaultUserSelect,
      });
    },
  })
  .mutation('signUp', {
    input: UserCreateWhereInput,
    async resolve({ ctx, input }) {
      console.log({
        req: ctx.req,
      });

      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.data.email,
        },
      });
      if (user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `User with Email: ${input.data.email} already Exists`,
        });
      }
      const { email, name, password } = input.data;

      const refreshToken = uuidv4();

      const newUser = await ctx.prisma.user.create({
        data: {
          name,
          email,
          passwordHash: await hashPassword(password),
          posts: {
            create: [],
          },
        },
      });

      // Generate a random string that will constitute the fingerprint for this user
      const fingerprint = crypto.randomBytes(50).toString('hex');
      // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
      // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
      const jwt = setFingerprintCookieAndSignJwt(fingerprint, ctx.res, newUser);

      return {
        jwt,
        refreshToken,
      };
    },
  })
  .mutation('logout', {
    async resolve({ ctx }) {
      ctx.res.setHeader(
        'Set-Cookie',
        serialize(FINGERPRINT_COOKIE_NAME, '', {
          maxAge: -1,
          path: '/',
        })
      );
      return {
        ok: true,
      };
    },
  })
  .mutation('login', {
    input: UserLoginWhereInput,
    async resolve({ ctx, input }) {
      const { email, password } = input.data;
      const user = await ctx.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      const validPassword = await checkPassword(password, user.passwordHash);

      if (!validPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid credentials',
        });
      }
      // Update user refresh token and refresh token expiration
      const refreshToken = uuidv4();
      await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken,
          // 1 hour, UTC time in ISO format
          refreshTokenExpiresAt: new Date(
            Date.now() + 1000 * 60 * 60 * 1
          ).toISOString(),
        },
      });
      // //Generate a random string that will constitute the fingerprint for this user
      const fingerprint = crypto.randomBytes(50).toString('hex');

      // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
      // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
      const jwt = setFingerprintCookieAndSignJwt(fingerprint, ctx.res, user);

      return {
        jwt,
        refreshToken,
      };
    },
  })
  .mutation('refreshToken', {
    input: RefreshTokenInput,
    async resolve({ ctx, input }) {
      const { refreshToken, fingerPrintHash } = input.data;

      const fingerprintCookie = getCookie(
        ctx.req.headers.cookie,
        FINGERPRINT_COOKIE_NAME
      );
      console.log({ fingerprintCookie });
      if (!fingerprintCookie)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Unable to refresh JWT token',
        });

      // Compute a SHA256 hash of the received fingerprint in cookie in order to compare
      // it to the fingerprint hash stored in the token
      const fingerprintCookieHash = sha256(fingerprintCookie);
      console.log({
        fingerprintCookie,
        fingerprintCookieHash,
        fingerPrintHash,
      });

      if (fingerPrintHash != fingerprintCookieHash) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Unable to refresh JWT token',
        });
      }

      const user = await ctx.prisma.user.findFirst({
        where: {
          refreshToken,
        },
      });
      if (!user)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User not found',
        });

      await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: uuidv4(),
          refreshTokenExpiresAt: new Date(
            Date.now() + 1000 * 60 * 60 * 1
          ).toISOString(),
        },
      });
      const jwt = tokenGenerator.signWithClaims({
        expiresIn: '5m',
        allowedRoles: ['user'],
        defaultRole: 'user',
        otherClaims: {
          'X-Hasura-User-Id': String(user.id),
        },
      });
      return {
        jwt,
      };
    },
  });
