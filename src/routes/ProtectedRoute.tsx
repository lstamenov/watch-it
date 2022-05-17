import React from 'react';
import useUser from '../hooks/useUser';
import Login from '../pages/Login/Login';

const ProtectedRoute: React.FC = ({ children }) => {
  const user = useUser();
 
  return user ? <>{children}</> : <Login />;
};

export default ProtectedRoute;