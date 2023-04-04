import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from '../../../i18n/i18n';
import MovieService from '../../../services/movies/MovieService';
import ShowService from '../../../services/shows/ShowService';
import WatchService from '../../../services/watch/WatchService';
import { WatchState } from './watchSlice';

const movieService: MovieService = new MovieService(axios, i18n);
const showService: ShowService = new ShowService(axios, i18n);
const watchService: WatchService = new WatchService(axios, i18n, movieService, showService);

export const fetchMovie = createAsyncThunk('watch/fetchMovie', async (id: number) => {
  const movieData = await watchService.fetchMovie(id);
  return movieData;
});

export const fetchShow = createAsyncThunk('watch/fetchShow', async (id: number) => {
  const showData = await watchService.fetchShow(id);
  return showData;
});

export const extraReducers = (builder: ActionReducerMapBuilder<WatchState>) => {
  builder.addCase(fetchMovie.fulfilled, (state, action) => {
    state.movie = { ...action.payload, status: action.meta.requestStatus };
  });

  builder.addCase(fetchShow.fulfilled, (state, action) => {
    state.show = { ...action.payload, status: action.meta.requestStatus };
  });

  builder.addCase(fetchMovie.rejected, (state, action) => {
    state.movie = {
      movie: null,
      recommendations: [],
      similar: [],
      status: action.meta.requestStatus,
    };
  });

  builder.addCase(fetchShow.rejected, (state, action) => {
    state.show = {
      show: null,
      recommendations: [],
      similar: [],
      status: action.meta.requestStatus,
    };
  });
};
