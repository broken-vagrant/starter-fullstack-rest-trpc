import { prisma } from '~/context';
import { inferMutationInput } from '~/utils/trpc';
import { appRouter } from '../routers/_app';
import httpMocks from 'node-mocks-http';
import { createFakeUser } from './__helpers';

const user1 = createFakeUser();

describe('user', () => {
  test('create', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    const caller = appRouter.createCaller({
      prisma,
      req,
      res,
      user: null,
    });

    const user = await caller.mutation('user.signUp', user1);

    expect(user).toHaveProperty('jwt');
    expect(user.jwt).not.toBeNull();
    expect(user).toHaveProperty('refreshToken');
    expect(user.refreshToken).not.toBeNull();
  });

  test('login', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    const caller = appRouter.createCaller({
      prisma,
      req,
      res,
      user: null,
    });

    const loginInput: inferMutationInput<'user.login'> = {
      data: {
        email: user1.data.email,
        password: user1.data.password,
      },
    };
    const logged = await caller.mutation('user.login', loginInput);

    expect(logged).toHaveProperty('jwt');
    expect(logged.jwt).not.toBeNull();
    expect(logged).toHaveProperty('refreshToken');
    expect(logged.refreshToken).not.toBeNull();
  });
});
