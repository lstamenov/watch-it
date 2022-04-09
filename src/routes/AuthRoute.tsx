import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute: React.FC = ({ children }) => {
  const user: string | null = localStorage.getItem('user');

  const renderContent = () => !user ? <>{children}</> : <Navigate to='/' />;
  return (
    renderContent()
  );
};

export default AuthRoute;