import useBroadcastAuthSession from '~/hooks/useBroadcastAuthSession';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '~/utils/trpc';
import { getFetchOptions } from '../auth';
import superjson from 'superjson';

interface AppProviderProps {
  children: ReactNode;
}
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  url: 'http://localhost:4000/trpc',
  fetch: async (url, opts) => {
    return fetch(url, {
      ...opts,
      ...(await getFetchOptions()),
    });
  },
  transformer: superjson,
});

const AppProvider = ({ children }: AppProviderProps) => {
  useBroadcastAuthSession({ queryClient });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default AppProvider;
