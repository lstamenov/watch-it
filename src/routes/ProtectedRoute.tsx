import React from 'react';
import Login from '../pages/Login/Login';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user/selectors';

const ProtectedRoute: React.FC = ({ children }) => {
  const user = useAppSelector(selectUser);

  return user ? <>{children}</> : <Login />;
};

export default ProtectedRoute;