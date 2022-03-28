import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Genres from '../pages/genres/Genres';
import Header from '../pages/header/Header';
import Home from '../pages/home/Home';
import Movies from '../pages/movies/Movies';
import Shows from '../pages/shows/Shows';
import MoviePlayer from '../pages/Watch/Movie/MoviePlayer';
import './App.css';

const App: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Header />
        <Routes>
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
