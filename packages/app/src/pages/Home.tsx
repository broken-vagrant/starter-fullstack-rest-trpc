import LoadingSpinner from "~/components/LoadingSpinner";
import {
  useGetAllUsersQuery,
  useWhoAmIQuery,
} from "~/__generated__/graphqlTypes";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoadUsers = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const { data, error, isLoading } = useGetAllUsersQuery(undefined, {
    enabled: triggerQuery,
    onError: (err: Error) => {
      console.error(err);
    },
  });
  const getAllUsers = () => {
    if (!triggerQuery) {
      setTriggerQuery(true);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="m-1 text-2xl font-extrabold">Welcome to Demo!</h2>
      <button onClick={getAllUsers} className="teal-btn">
        Load users
      </button>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!isLoading && !error && (
        <ul className="mt-8">
          {data?.allUsers.map((user) => {
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
  const { data, isLoading } = useWhoAmIQuery(undefined, {
    onError: () => {
      navigate("/sign-in");
    },
    refetchOnMount: true,
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!data?.whoami) {
    return (
      <div className="flex justify-center items-center">
        Please &nbsp; <Link to="/sign-in">sign in</Link>.
      </div>
    );
  }
  return <section>{data?.whoami?.name && <LoadUsers />}</section>;
};

export default Demo;
