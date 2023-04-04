import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { MoviesState } from './moviesSlice';
import axios from 'axios';
import i18n from '../../../i18n/i18n';
import MovieService from '../../../services/movies/MovieService';

const service = new MovieService(axios, i18n);

export const loadTrendingMovies = createAsyncThunk('movies/loadTrendingMovies', async () => {
  const trendingMovies = await service.fetchTrending();
  return trendingMovies;
});

export const loadPopularMovies = createAsyncThunk('movies/loadPopularMovies', async () => {
  const popularMovies = await service.fetchPopular();
  return popularMovies;
});

export const loadTopRatedMovies = createAsyncThunk('movies/loadTopRatedMovies', async () => {
  const topRatedMovies = await service.fetchTopRated();
  return topRatedMovies;
});

type StateTypes = 'trending' | 'topRated' | 'popular';

const actions = [
  { f: loadTrendingMovies, prop: 'trending' as StateTypes },
  { f: loadPopularMovies, prop: 'popular' as StateTypes },
  { f: loadTopRatedMovies, prop: 'topRated' as StateTypes },
];

export const extraReducers = (builder: ActionReducerMapBuilder<MoviesState>) => {
  actions.forEach(({ f, prop }) =>
    builder.addCase(f.fulfilled, (state, action) => {
      state[prop].movies = action.payload;
      state[prop].status = 'fulfilled';
    }),
  );

  actions.forEach(({ f, prop }) =>
    builder.addCase(f.rejected, (state, action) => {
      state[prop].status = action.meta.requestStatus;
    }),
  );

  actions.forEach(({ f, prop }) =>
    builder.addCase(f.pending, (state, action) => {
      state[prop].status = action.meta.requestStatus;
    }),
  );
};
