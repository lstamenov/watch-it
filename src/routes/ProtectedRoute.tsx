import React from 'react';
import { useUser } from '../store';
import Login from '../pages/Login/Login';

const ProtectedRoute: React.FC = ({ children }) => {
  const { user } = useUser();

  return user.user ? <>{children}</> : <Login />;
};

export default ProtectedRoute;
