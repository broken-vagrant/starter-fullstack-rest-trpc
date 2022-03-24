import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers/_app';
import { createContext } from './context';
import cors from 'cors';

// import { expressHandler } from 'trpc-playground/handlers/express';
// import { IS_PROD } from './constants';

export const getServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

    next();
  });

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // if (!IS_PROD) {
  //   const trpcPlayground = await expressHandler({
  //     trpcApiEndpoint: '/trpc',
  //     playgroundEndpoint: '/trpc-playground',
  //     router: appRouter,
  //   });

  //   app.use('/trpc-playground', trpcPlayground);
  // }

  app.get('/', (_req, res) => res.send('hello'));
  return app;
};
