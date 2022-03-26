import { inferMutationInput } from '~/utils/trpc';
import { prisma } from '~/context';
import faker from '@faker-js/faker';
import { DecodedUser } from '~/types';
import httpMocks from 'node-mocks-http';

export const createFakeUser = (): inferMutationInput<'user.signUp'> => ({
  email: faker.internet.email(faker.random.word()),
  password: faker.internet.password(8),
  name: faker.name.firstName(),
});

export const createFakePostData = (): Omit<
  inferMutationInput<'post.createDraft'>,
  'authorEmail'
> => ({
  title: faker.lorem.words(5),
  content: faker.lorem.paragraphs(2),
});

export const createFakeContext = ({ user }: { user?: DecodedUser }) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  return {
    prisma,
    req,
    res,
    user: user || null,
  };
};
