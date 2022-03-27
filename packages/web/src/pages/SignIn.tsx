import { setJwtToken, setRefreshToken } from '~/utils/jwt';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { trpc } from '~/utils/trpc';
import { FormattedError, formatError } from '~/utils';
import { tokenRefresher } from '~/lib/auth';

function App() {
  // GraphQL API
  const navigate = useNavigate();
  const { data } = trpc.useQuery(['user.whoami']);
  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data]);
  const client = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formattedErrors, setFormattedErrors] = useState<FormattedError>({});
  const { mutate, error, isLoading } = trpc.useMutation('user.login', {
    onSuccess: async (data) => {
      if (data) {
        // reset tokenRefresher data
        tokenRefresher.reset();

        // set tokens
        setJwtToken(data?.jwt);
        setRefreshToken(data?.refreshToken as string);

        // refresh queries
        await client.invalidateQueries(['WhoAmI']);

        navigate('/');
      }
    },
  });

  useEffect(() => {
    if (error) setFormattedErrors(formatError(error));
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    client.clear();
    mutate({
      email,
      password,
    });
  };
  return (
    <div className="flex flex-col items-center  mx-auto md:max-w-[300px]">
      <h2 className="m-1 text-2xl font-extrabold">Login</h2>
      <form onSubmit={handleSubmit} className="my-8 w-full">
        {formattedErrors.formErrors ? (
          <div className="mt-8 error">{formattedErrors?.formErrors[0]}</div>
        ) : (
          formattedErrors.message && (
            <div className="mt-8 error">{formattedErrors.message}</div>
          )
        )}
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="username"
            required
            className="base-input"
          />
          <span className="block field-error">
            {formattedErrors?.fieldErrors?.email}
          </span>
        </div>
        <div className="mt-8">
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="base-input"
          />
          <span className="block field-error">
            {formattedErrors?.fieldErrors?.password}
          </span>
        </div>
        <button type="submit" className="teal-btn mt-8">
          {isLoading ? 'logging in...' : 'Login'}
        </button>
      </form>
      <div>
        Don't have account,{' '}
        <Link to="/sign-up" className="link">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default App;
