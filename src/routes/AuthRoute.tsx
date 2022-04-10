import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user/selectors';
import { User } from '../store/user/types';

const AuthRoute: React.FC = ({ children }) => {
  const user: User | null = useAppSelector(selectUser);

  const renderContent = () => !user ? <>{children}</> : <Navigate to='/' />;
  
  return (
    renderContent()
  );
};

export default AuthRoute;