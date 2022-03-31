import { inferMutationInput } from '~/utils/trpc';
import { appRouter } from '../routers/_app';
import { createFakeContext, createFakeUser } from './__helpers';

const user1 = createFakeUser();

describe('user', () => {
  test('create', async () => {
    const caller = appRouter.createCaller(createFakeContext({}));

    const user = await caller.mutation('user.signUp', user1);

    expect(user).toHaveProperty('jwt');
    expect(user.jwt).not.toBeNull();
    expect(user).toHaveProperty('refreshToken');
    expect(user.refreshToken).not.toBeNull();
  });

  test('login', async () => {
    const caller = appRouter.createCaller(createFakeContext({}));

    const loginInput: inferMutationInput<'user.login'> = {
      email: user1.email,
      password: user1.password,
    };
    const logged = await caller.mutation('user.login', loginInput);

    expect(logged).toHaveProperty('jwt');
    expect(logged.jwt).not.toBeNull();
    expect(logged).toHaveProperty('refreshToken');
    expect(logged.refreshToken).not.toBeNull();
  });
});
