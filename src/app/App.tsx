import { StyledEngineProvider } from '@mui/material';
import React, { useLayoutEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../pages/header/Header';
import ProtectedRoute from '../routes/ProtectedRoute';
import AuthRoute from '../routes/AuthRoute';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import ToastProvider from '../providers/ToastProvider';
import ScrollTopButton from '../components/ScrollTopButton';
import { RouteData } from '../types/types';
import { routes } from '../routes/routes';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import { default as BottomNavigationUI } from '../ui/BottomNavigation/BottomNavigation';
import useMobile from '../hooks/useMobile';
import { useUser } from '../store';

const App: React.FC = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const { authenticate } = useUser();

  console.log('error'); 

  useLayoutEffect(() => {
    authenticate();
  }, []);

  const MobileNavigation = useMemo(
    () => <BottomNavigation>{(props) => <BottomNavigationUI {...props} />}</BottomNavigation>,
    [],
  );

  const renderRoutes = (routesData: RouteData[]) => (
    <Routes location={location} key={location.pathname}>
      {routesData.map(({ type, Page, path }) => {
        if (type === 'PRIVATE_ROUTE') {
          return (
            <Route
              path={path}
              key={path}
              element={
                <ProtectedRoute>
                  <Page />
                </ProtectedRoute>
              }
            />
          );
        }

        if (type === 'AUTH_ROUTE') {
          return (
            <Route
              path={path}
              key={path}
              element={
                <AuthRoute>
                  <Page />
                </AuthRoute>
              }
            />
          );
        }

        return <Route key={path} path={path} element={<Page />} />;
      })}
    </Routes>
  );

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Header />
        <ToastProvider>
          <AnimatePresence>
            <ScrollTopButton>{renderRoutes(routes)}</ScrollTopButton>
          </AnimatePresence>
        </ToastProvider>
        {isMobile && MobileNavigation}
      </div>
    </StyledEngineProvider>
  );
};

export default App;
