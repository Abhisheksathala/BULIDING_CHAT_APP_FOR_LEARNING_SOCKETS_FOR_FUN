import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';

// PAGES
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Groups = React.lazy(() => import('./pages/Groups'));
const NotFound = React.lazy(() => import('./pages/PagenotFound'));
import LayoutLoader from './components/layout/Loader';
let user = true;

const App = () => {
  return (
    <Suspense
      fallback={
        <>
          <LayoutLoader />
        </>
      }
    >
      <Routes>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
        </Route>
        <Route element={<ProtectRoute user={!user} redirect="/" />}>
          <Route path="/userauthentication">
            <Route path="login" element={<Login type={'login'} />} />
            <Route path="register" element={<Login type={'signin'} />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
