import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../store';

const AuthRoute: React.FC = ({ children }) => {
  const { user } = useUser();

  const isAuthenticated = Boolean(user.user);

  if (!isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthRoute;
