import React from 'react';
import Login from '../pages/Login/Login';

const ProtectedRoute: React.FC = ({ children }) => {
  const user: string | null = localStorage.getItem('user');

  const renderContent = () => user ? <>{children}</> : <Login />;
  return (
    renderContent()
  );
};

export default ProtectedRoute;