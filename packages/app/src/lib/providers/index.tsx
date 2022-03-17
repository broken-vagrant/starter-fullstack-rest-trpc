import useBroadcastAuthSession from "~/hooks/useBroadcastAuthSession";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { trpc } from "~/utils/trpc";

interface AppProviderProps {
  children: ReactNode;
}
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  url: "http://localhost:4000/trpc",
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
