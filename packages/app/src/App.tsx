import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import { trpc } from './utils/trpc';

// const Home = lazy(() => import('./pages/Home'));
// const SignUp = lazy(() => import('./pages/SignUp'));
// const SignIn = lazy(() => import('./pages/SignIn'));

const App = ({ basename = '/starter-rest/' }: { basename?: string }) => {
  const hello = trpc.useQuery(['post.all']);
  console.log(hello);

  return (
    <BrowserRouter basename={basename}>
      <ErrorBoundary>
        hello
        {/* <Layout> */}
        {/* <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/sign-in" element={<SignIn />}></Route>
              <Route path="/sign-up" element={<SignUp />}></Route>
            </Routes>
          </Suspense> */}
        {/* </Layout> */}
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
