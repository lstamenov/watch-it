import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from '../../../i18n/i18n';
import GenreService from '../../../services/genres/GenreService';
import { Genre } from '../../../types/types';
import { GenresState } from './genresSlice';

const genresService: GenreService = new GenreService(axios, i18n);

export const loadMovieGenres = createAsyncThunk('genres/loadMovieGenres', async () => {
  const movieGenres: Genre[] = await genresService.fetchMovieGenres();
  return movieGenres;
});

export const loadShowGenres = createAsyncThunk('genres/loadShowGenres', async () => {
  const showGenres: Genre[] = await genresService.fetchShowGenres();
  return showGenres;
});

export const extraReducers = (builder: ActionReducerMapBuilder<GenresState>) => {
  builder.addCase(loadMovieGenres.fulfilled, (state, action) => {
    const {
      payload,
      meta: { requestStatus },
    } = action;

    state.movieGenres = payload;
    state.status = requestStatus;
  });

  builder.addCase(loadShowGenres.fulfilled, (state, action) => {
    const {
      payload,
      meta: { requestStatus },
    } = action;

    state.showGenres = payload;
    state.status = requestStatus;
  });
};
