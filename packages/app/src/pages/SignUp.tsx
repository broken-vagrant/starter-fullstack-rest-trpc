import { setJwtToken, setRefreshToken } from "~/utils/jwt";
import {
  useSignUpMutation,
  useWhoAmIQuery,
} from "~/__generated__/graphqlTypes";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  useWhoAmIQuery(undefined, {
    onSuccess: (data) => {
      if (data?.whoami) {
        navigate("/");
      }
    },
  });

  const client = useQueryClient();
  const { mutate, isLoading, error } = useSignUpMutation<Error>({
    onSuccess: async (data) => {
      setJwtToken(data.signupUser.jwt);
      setRefreshToken(data.signupUser.refreshToken);

      // refresh WhoAmI query after setting tokens
      await client.invalidateQueries(["WhoAmI"]);

      navigate("/");
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name } = e.currentTarget.elements as any;
    mutate({
      data: {
        email: email.value,
        password: password.value,
        name: name.value,
      },
    });
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">SignUp</h2>
      <form onSubmit={handleSubmit} className="my-8">
        {error && (
          <div className="mt-8 error">
            {error.message || "Something went wrong!"}
          </div>
        )}
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            autoComplete="name"
            className="base-input"
          />
        </div>
        <div className="mt-8">
          <input
            type="email"
            name="email"
            placeholder="email"
            autoComplete="username"
            className="base-input"
          />
        </div>
        <div className="mt-8">
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            className="base-input"
          />
        </div>
        <button className="teal-btn mt-8" type="submit">
          Sign up
        </button>
      </form>
      {isLoading && <div>Processing... </div>}
      <div>
        Already have an account, <Link to="/sign-in">Sign in</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
