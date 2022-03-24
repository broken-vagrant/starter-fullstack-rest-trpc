import { createRouter } from '~/creatRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { Id } from './zod-utils';
import { defaultUserSelect, UserUniqueInput } from './user';

const PostCreateInput = z.object({
  data: z.object({
    title: z.string(),
    content: z.string(),
  }),
  authorEmail: z.string().email(),
});

export const postRouter = createRouter()
  .query('byId', {
    input: Id,
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.findFirst({
        where: {
          id: Number(input.id),
        },
        select: {
          author: false,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${input.id}'`,
        });
      }
      return post;
    },
  })
  .query('byIdWithAuthor', {
    input: Id,
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.findFirst({
        where: {
          id: Number(input.id),
        },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${input.id}'`,
        });
      }
      const author = await ctx.prisma.user.findFirst({
        where: {
          id: post.authorId,
        },
        select: defaultUserSelect,
      });
      return {
        author,
        post,
      };
    },
  })
  .query('feed', {
    input: z.object({
      searchString: z.string(),
      skip: z.number().nullish(),
      take: z.number().min(1).max(100).default(5).nullish(),
      orderBy: z.record(z.string().nullish()).nullish(),
    }),
    async resolve({ ctx, input }) {
      const or = input.searchString
        ? {
            OR: [
              { title: { contains: input.searchString } },
              { content: { contains: input.searchString } },
            ],
          }
        : {};

      return ctx.prisma.post.findMany({
        where: {
          published: true,
          ...or,
        },
        take: input.take || undefined,
        skip: input.skip || undefined,
        orderBy: input.orderBy || undefined,
      });
    },
  })
  .query('draftsByUser', {
    input: UserUniqueInput,
    async resolve({ input, ctx }) {
      return ctx.prisma.user
        .findUnique({
          where: {
            id: input.id,
            email: input.email,
          },
        })
        .posts({
          where: {
            published: false,
          },
        });
    },
  })
  .mutation('createDraft', {
    input: PostCreateInput,
    async resolve({ input, ctx }) {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.data.title,
          content: input.data.content,
          author: {
            connect: {
              email: input.authorEmail,
            },
          },
        },
      });
      return post;
    },
  })
  .mutation('togglePublish', {
    input: Id,
    async resolve({ input, ctx }) {
      try {
        const post = await ctx.prisma.post.findUnique({
          where: { id: input.id || undefined },
          select: {
            published: true,
          },
        });
        if (!post) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No post with id '${input.id}'`,
          });
        }
        return ctx.prisma.post.update({
          where: { id: input.id || undefined },
          data: { published: !post?.published },
        });
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Something went wrong`,
        });
      }
    },
  })
  .mutation('incrementViewCount', {
    input: Id,
    async resolve({ ctx, input }) {
      return ctx.prisma.post.update({
        where: { id: input.id || undefined },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });
    },
  })
  .mutation('delete', {
    input: Id,
    async resolve({ ctx, input }) {
      return ctx.prisma.post.delete({
        where: { id: input.id },
      });
    },
  });
