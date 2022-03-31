import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mocks/server';
import fetch from 'cross-fetch';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
  global.fetch = fetch;
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
