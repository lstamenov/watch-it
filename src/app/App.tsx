import { StyledEngineProvider } from '@mui/material';
import React, { useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../pages/header/Header';
import ProtectedRoute from '../routes/ProtectedRoute';
import AuthRoute from '../routes/AuthRoute';
import { useDispatch } from 'react-redux';
import { auth } from '../store/user/thunk';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import ToastProvider from '../providers/ToastProvider';
import ScrollTopButton from '../components/ScrollTopButton';
import { RouteData } from '../types/types';
import { routes } from '../routes/routes';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useLayoutEffect(() => {
    dispatch(auth());
  }, []);

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
            <ScrollTopButton>
              {renderRoutes(routes)}
            </ScrollTopButton>
          </AnimatePresence>
        </ToastProvider>
      </div>
    </StyledEngineProvider>
  );
};

export default App;
