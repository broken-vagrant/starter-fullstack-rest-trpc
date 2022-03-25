import { setJwtToken, setRefreshToken } from '~/utils/jwt';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { trpc } from '~/utils/trpc';
import { formatError, FormattedError } from '~/utils';
import { useEffect, useState } from 'react';

const SignUpPage = () => {
  const navigate = useNavigate();

  trpc.useQuery(['user.whoami'], {
    onSuccess: (data) => {
      if (data) {
        navigate('/');
      }
    },
  });

  const client = useQueryClient();

  const [formattedErrors, setFormattedErrors] = useState<FormattedError>({});
  const { mutate, isLoading, error } = trpc.useMutation('user.signUp', {
    onSuccess: async (data) => {
      setJwtToken(data.jwt);
      setRefreshToken(data.refreshToken);

      // refresh WhoAmI query after setting tokens
      await client.invalidateQueries(['WhoAmI']);

      navigate('/');
    },
  });

  useEffect(() => {
    if (error) setFormattedErrors(formatError(error));
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name } = e.currentTarget.elements as any;
    mutate({
      email: email.value,
      password: password.value,
      name: name.value,
    });
  };
  return (
    <div className="flex flex-col items-center mx-auto md:max-w-[300px]">
      <h2 className="text-2xl font-bold">SignUp</h2>
      <form onSubmit={handleSubmit} className="my-8 w-full">
        {formattedErrors.formErrors && (
          <div className="mt-8 error">{formattedErrors?.formErrors[0]}</div>
        )}
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            autoComplete="name"
            className="base-input"
            required
          />
          <span className="block field-error">
            {formattedErrors?.fieldErrors?.name}
          </span>
        </div>
        <div className="mt-8">
          <input
            type="email"
            name="email"
            placeholder="email"
            autoComplete="username"
            className="base-input"
            required
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
            className="base-input"
            required
          />
          <span className="block field-error">
            {formattedErrors?.fieldErrors?.password}
          </span>
        </div>
        <button className="teal-btn mt-8" type="submit">
          {isLoading ? 'processing...' : 'Sign Up'}
        </button>
      </form>
      <div>
        Already have an account, <Link to="/sign-in">Sign in</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
