import React, { useEffect, useState } from 'react';
import Login from '../pages/Login/Login';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user/selectors';

const ProtectedRoute: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const reduxUser = useAppSelector(selectUser);

  const localStorageUser = localStorage.getItem('user');
  useEffect(() => {
    setUser(localStorageUser ? JSON.parse(localStorageUser) : null);
  }, [localStorageUser, reduxUser]);
  
  const renderContent = () => user ? <>{children}</> : <Login />;
  return (
    renderContent()
  );
};

export default ProtectedRoute;