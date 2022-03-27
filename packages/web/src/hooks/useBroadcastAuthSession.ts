import { sessionChannel, SessionChannelActions } from '~/lib/broadcast';
import { useCallback, useEffect } from 'react';
import { QueryClient } from 'react-query';

const useBroadcastAuthSession = ({
  queryClient,
}: {
  queryClient: QueryClient;
}) => {
  const handleChannel = useCallback(
    async (msg: SessionChannelActions) => {
      {
        console.log({ msg });

        switch (msg.type) {
          case 'new-tab':
            sessionChannel.postMessage({
              type: 'session-data',
              payload: JSON.stringify(sessionStorage),
            });
            break;
          case 'session-data':
            try {
              if (msg.payload) {
                const data = JSON.parse(msg.payload);
                for (const key in data) {
                  sessionStorage.setItem(key, data[key]);
                }
                await queryClient.refetchQueries(['WhoAmI']);
              }
            } catch (err) {
              console.error(err);
            }
            break;
          case 'set-jwt':
            sessionStorage.setItem('jwt', msg.payload);
            await queryClient.refetchQueries(['WhoAmI']);
            break;
          case 'set-refreshToken':
            sessionStorage.setItem('refreshToken', msg.payload);
            await queryClient.refetchQueries(['WhoAmI']);
            break;
          case 'logout':
            sessionStorage.clear();
            break;
          default:
            break;
        }
      }
    },
    [queryClient]
  );
  useEffect(() => {
    sessionChannel.addEventListener('message', handleChannel);

    if (!sessionStorage.length) {
      sessionChannel.postMessage({
        type: 'new-tab',
      });
    }

    return () => {
      sessionChannel.removeEventListener('message', handleChannel);
    };
  }, []);
};

export default useBroadcastAuthSession;
