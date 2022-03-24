/**
 * Integration test example for the `post` router
 */
import { prisma } from '~/context';
import { inferMutationInput } from '~/utils/trpc';
import { appRouter } from '../routers/_app';
import httpMocks from 'node-mocks-http';
import { createFakePostData, createFakeUser } from './__helpers';

const user1 = createFakeUser();
const postData1 = createFakePostData();

describe('post', () => {
  test('create draft with invalid email', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const caller = appRouter.createCaller({
      prisma,
      req,
      res,
      user: null,
    });

    const input: inferMutationInput<'post.createDraft'> = {
      data: {
        title: 'Draft 1',
        content: 'Lore dsljfsdf asdjfls asdfjlasdjfalsd',
      },
      authorEmail: 'test@test.com',
    };
    try {
      await caller.mutation('post.createDraft', {
        data: postData1,
        authorEmail: user1.data.email,
      });
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
  test('create draft with valid email', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const caller = appRouter.createCaller({
      prisma,
      req,
      res,
      user: null,
    });

    const createUserInput: inferMutationInput<'user.signUp'> = {
      data: {
        name: 'test1',
        email: 'test1@test.com',
        password: '123456',
      },
    };
    await caller.mutation('user.signUp', user1);

    const createDraftInput: inferMutationInput<'post.createDraft'> = {
      data: postData1,
      authorEmail: user1.data.email,
    };
    const post = await caller.mutation('post.createDraft', createDraftInput);
    expect(post).toHaveProperty('title');
    expect(post.title).toBe(createDraftInput.data.title);
    expect(post).toHaveProperty('content');
    expect(post.content).toBe(createDraftInput.data.content);
  });
});
