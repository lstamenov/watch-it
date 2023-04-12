import React from 'react';
import { useUser } from '../store';
import NotFound from '../pages/NotFound/NotFound';
import AnimatedPage from '../ui/AnimatedPage/AnimatedPage';

const ProtectedRoute: React.FC = ({ children }) => {
  const {
    user: { user, status },
  } = useUser();

  if (status === 'pending') return <AnimatedPage isLoading={status === 'pending'} />;

  return user ? <>{children}</> : <NotFound />;
};

export default ProtectedRoute;
