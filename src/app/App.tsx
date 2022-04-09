import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/Register/Register';
import Genres from '../pages/genres/Genres';
import Header from '../pages/header/Header';
import Home from '../pages/home/Home';
import Login from '../pages/Login/Login';
import Movies from '../pages/movies/Movies';
import Shows from '../pages/shows/Shows';
import MoviePlayer from '../pages/Watch/Movie/MoviePlayer';
import ShowPlayer from '../pages/Watch/Show/ShowPlayer';
import './App.css';
import ProtectedRoute from '../routes/ProtectedRoute';
const App: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/shows/play/:id' element={<ProtectedRoute><ShowPlayer /></ProtectedRoute>} />
          <Route path="/movies/play/:id" element={<ProtectedRoute><MoviePlayer /></ProtectedRoute>} />
          <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path="/shows" element={<ProtectedRoute><Shows /></ProtectedRoute>} />
          <Route path="/genres" element={<ProtectedRoute><Genres /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </div>
    </StyledEngineProvider>
  );
};

export default App;
