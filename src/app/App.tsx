import { StyledEngineProvider } from '@mui/material';
import React, { useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Register from '../pages/Register/Register';
import Genres from '../pages/genres/Genres';
import Header from '../pages/header/Header';
import Home from '../pages/home/Home';
import Login from '../pages/Login/Login';
import Movies from '../pages/movies/Movies';
import Shows from '../pages/shows/Shows';
import MoviePlayer from '../pages/Watch/Movie/MoviePlayer';
import ShowPlayer from '../pages/Watch/Show/ShowPlayer';
import ProtectedRoute from '../routes/ProtectedRoute';
import AuthRoute from '../routes/AuthRoute';
import { useDispatch } from 'react-redux';
import { auth } from '../store/user/thunk';
import Profile from '../pages/Profile/Profile';
import SearchResults from '../pages/SearchResults/SearchResults';
import NotFound from '../pages/NotFound/NotFound';
import Movie from '../pages/Movie/Movie';
import Show from '../pages/Show/Show';
import { AnimatePresence } from 'framer-motion';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useLayoutEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Header />
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <SearchResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/shows/play/:id"
              element={
                <ProtectedRoute>
                  <ShowPlayer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies/play/:id"
              element={
                <ProtectedRoute>
                  <MoviePlayer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies/:id"
              element={
                <ProtectedRoute>
                  <Movie />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/movies"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shows/:id"
              element={
                <ProtectedRoute>
                  <Show />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shows"
              element={
                <ProtectedRoute>
                  <Shows />
                </ProtectedRoute>
              }
            />
            <Route
              path="/genres"
              element={
                <ProtectedRoute>
                  <Genres />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
    </StyledEngineProvider>
  );
};

export default App;
