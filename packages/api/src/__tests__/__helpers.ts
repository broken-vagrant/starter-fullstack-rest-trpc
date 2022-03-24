import { inferMutationInput } from '~/utils/trpc';
import faker from '@faker-js/faker';

export const createFakeUser = (): inferMutationInput<'user.signUp'> => ({
  data: {
    email: faker.internet.email(),
    password: faker.internet.password(8),
    name: faker.name.firstName(),
  },
});

export const createFakePostData =
  (): inferMutationInput<'post.createDraft'>['data'] => ({
    title: faker.lorem.words(5),
    content: faker.lorem.paragraphs(2),
  });
