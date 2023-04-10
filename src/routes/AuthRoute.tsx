import React from 'react';
import NotFound from '../pages/NotFound/NotFound';
import { useUser } from '../store';
import AnimatedPage from '../ui/AnimatedPage/AnimatedPage';

const AuthRoute: React.FC = ({ children }) => {
  const {
    user: { user, status },
  } = useUser();

  if (status === 'pending') return <AnimatedPage isLoading={status === 'pending'} />;

  return !user ? <>{children}</> : <NotFound />;
};

export default AuthRoute;
