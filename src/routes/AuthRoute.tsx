import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import { useUser } from '../store';
import AnimatedPage from '../ui/AnimatedPage/AnimatedPage';

const AuthRoute: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const {
    user: { user, status },
  } = useUser();

  if (status === 'pending') return <AnimatedPage isLoading={status === 'pending'} />;

  if (user) {
    navigate('/');
  }

  return !user ? <>{children}</> : <NotFound />;
};

export default AuthRoute;
