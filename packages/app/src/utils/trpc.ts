import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../../../api/src/routers/_app';

export const trpc = createReactQueryHooks<AppRouter>();
