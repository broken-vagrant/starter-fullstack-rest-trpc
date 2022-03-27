import { sessionChannel } from '~/lib/broadcast';
import { setJwtToken, setRefreshToken } from '~/utils/jwt';
import { ReactNode } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { trpc } from '~/utils/trpc';
import { tokenRefresher } from '~/lib/auth';

const Layout = ({ children }: { children: ReactNode }) => {
  const { data } = trpc.useQuery(['user.whoami'], {
    staleTime: 30 * 1000,
  });
  const navigate = useNavigate();
  const client = useQueryClient();
  const { mutate } = trpc.useMutation('user.logout', {
    onSuccess: () => {
      try {
        setJwtToken('');
        setRefreshToken('');
        client.clear();
        sessionStorage.clear();
        sessionChannel.postMessage({ type: 'logout' });
        navigate('/');
        tokenRefresher.reset();
      } catch (err) {
        console.error(err);
      } finally {
        navigate('/');
      }
    },
  });
  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      <header className="py-4 flex item-center justify-between">
        <Link to="/">
          <h1 className="text-5xl text-black font-font-extrabold underline">
            Auth Demo
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <div>
            <Link to="/about" className="underline">
              about
            </Link>
          </div>
          <div>
            Profile: <strong>{data?.name || 'Guest'}</strong>
          </div>
          {data?.name && (
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
