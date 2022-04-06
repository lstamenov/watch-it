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

const App: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/shows/play/:id' element={<ShowPlayer />} />
          <Route path="/movies/play/:id" element={<MoviePlayer />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </StyledEngineProvider>
  );
};

export default App;
