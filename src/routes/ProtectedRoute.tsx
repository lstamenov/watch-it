import React from 'react';
import Login from '../pages/Login/Login';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user/selectors';

const ProtectedRoute: React.FC = ({ children }) => {
  const user: string | null = localStorage.getItem('user');
  const reduxUser = useAppSelector(selectUser);

  const renderContent = () => (user || reduxUser) ? <>{children}</> : <Login />;
  return (
    renderContent()
  );
};

export default ProtectedRoute;