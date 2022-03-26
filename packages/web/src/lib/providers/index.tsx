import useBroadcastAuthSession from '~/hooks/useBroadcastAuthSession';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { transformer, trpc } from '~/utils/trpc';
import { getFetchOptions, getHeaders } from '../auth';
import { BACKEND_URL } from '~/constants';

interface AppProviderProps {
  children: ReactNode;
}
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  url: `${BACKEND_URL}/trpc`,
  fetch: async (url, opts) => {
    return fetch(url, {
      ...(await getFetchOptions()),
      ...opts,
    });
  },
  headers: getHeaders,
  transformer,
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
