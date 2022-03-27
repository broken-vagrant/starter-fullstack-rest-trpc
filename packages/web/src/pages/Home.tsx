import LoadingSpinner from '~/components/LoadingSpinner';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { trpc } from '~/utils/trpc';

const LoadUsers = () => {
  const [enabled, setEnabled] = useState(false);
  const { data, error, isLoading } = trpc.useQuery(['user.all'], {
    enabled: enabled,
    onError: (err) => {
      console.error(err);
    },
  });
  const getAllUsers = () => {
    if (!enabled) {
      setEnabled(true);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="m-1 text-2xl font-extrabold">Welcome to Demo!</h2>
      <button onClick={getAllUsers} className="teal-btn">
        {isLoading ? 'loading...' : 'Load users'}
      </button>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!isLoading && !error && (
        <ul className="mt-8">
          {data?.map((user) => {
            return (
              <li key={user.id}>
                <pre>{JSON.stringify(user)}</pre>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
const Demo = () => {
  const navigate = useNavigate();
  const { isLoading, data } = trpc.useQuery(['user.whoami'], {
    onError: () => {
      navigate('/sign-in');
    },
    refetchOnMount: true,
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!data) {
    return (
      <div className="flex justify-center items-center">
        Please &nbsp;{' '}
        <Link to="/sign-in" className="link">
          sign in
        </Link>
        .
      </div>
    );
  }
  return <section>{data?.name && <LoadUsers />}</section>;
};

export default Demo;
