/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { PrismaClient } from '@prisma/client';
import { getUser } from './utils';

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
});

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const rawToken = req.headers['authorization'] || '';
  const token = rawToken.split(' ')[1];
  const user = getUser(token);

  return {
    user,
    req,
    res,
    prisma,
  };
};
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
