/**
 * Integration test example for the `post` router
 */
import { inferMutationInput } from '~/utils/trpc';
import { appRouter } from '../routers/_app';
import {
  createFakeContext,
  createFakePostData,
  createFakeUser,
} from './__helpers';

const user1 = createFakeUser();

const postData1 = createFakePostData();

describe('post', () => {
  test('create draft with invalid email', async () => {
    const caller = appRouter.createCaller(createFakeContext({}));

    try {
      await caller.mutation('post.createDraft', {
        ...postData1,
        authorEmail: user1.email,
      });
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
  test('create draft with valid email', async () => {
    const caller = appRouter.createCaller(createFakeContext({}));

    await caller.mutation('user.signUp', user1);

    const createDraftInput: inferMutationInput<'post.createDraft'> = {
      ...postData1,
      authorEmail: user1.email,
    };
    const post = await caller.mutation('post.createDraft', createDraftInput);

    expect(post).toHaveProperty('title');
    expect(post.title).toBe(createDraftInput.title);
    expect(post).toHaveProperty('content');
    expect(post.content).toBe(createDraftInput.content);
  });
});
