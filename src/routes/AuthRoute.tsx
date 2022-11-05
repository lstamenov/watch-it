import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user/selectors';

const AuthRoute: React.FC = ({ children }) => {
  const user = useAppSelector(selectUser);
  
  const renderContent = () => !user ? <>{children}</> : <Navigate to='/' />;
  
  return (
    renderContent()
  );
};

export default AuthRoute;