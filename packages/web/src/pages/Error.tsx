import { Link, useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const { pathname } = useLocation();
  return (
    <div className="pt-16 w-[75%] mx-auto text-center rounded-lg bg-light-text-amber-50">
      <p>
        There was an error in loading this page.{' '}
        <span
          style={{ cursor: 'pointer', color: '#0077FF' }}
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload this page
        </span>{' '}
      </p>
      {pathname !== '/' && (
        <Link to="/" className="hover:underline">
          Back Home
        </Link>
      )}
    </div>
  );
};

export default ErrorPage;
