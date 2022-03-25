import { sessionChannel } from '~/lib/broadcast';
import { setJwtToken, setRefreshToken } from '~/utils/jwt';
import {
  useLogoutMutation,
  useWhoAmIQuery,
} from '@/__generated__/graphqlTypes';
import { ReactNode } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
  const { data } = useWhoAmIQuery(undefined, {
    staleTime: 30 * 1000,
  });
  const navigate = useNavigate();
  const client = useQueryClient();
  const { mutate } = useLogoutMutation({
    onSuccess: () => {
      try {
        setJwtToken('');
        setRefreshToken('');
        client.clear();
        sessionStorage.clear();
        sessionChannel.postMessage({ type: 'logout' });
        navigate('/');
      } catch (err) {
        console.error(err);
      } finally {
        navigate('/');
      }
    },
  });
  const handleLogout = () => {
    mutate({});
  };

  return (
    <>
      <header className="py-4 flex item-center justify-between">
        <Link to="/">
          <h1 className="text-5xl text-black font-font-extrabold underline">
            Auth Demo
          </h1>
        </Link>
        <div className="flex items-center">
          <div>
            Profile: <strong>{data?.whoami?.name || 'Guest'}</strong>
          </div>
          {data?.whoami?.name && (
            <button onClick={handleLogout} className="ml-4 teal-btn">
              log out
            </button>
          )}
        </div>
      </header>
      <main className="min-h-[80vh]">{children}</main>
      <footer className="min-h-[5rem] bg-black text-white flex justify-center items-center text-center">
        Footer
      </footer>
    </>
  );
};

export default Layout;
