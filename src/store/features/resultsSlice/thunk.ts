import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from '../../../i18n/i18n';
import MovieService from '../../../services/movies/MovieService';
import ResultsService from '../../../services/results/ResultsService';
import ShowService from '../../../services/shows/ShowService';
import { Genre } from '../../../types/types';
import { ResultsState } from './resultsSlice';

const movieService: MovieService = new MovieService(axios, i18n);
const showService: ShowService = new ShowService(axios, i18n);
const resultsService: ResultsService = new ResultsService(axios, i18n, movieService, showService);

export const fetchMovieGenresResults = createAsyncThunk(
  'results/fetchMovieGenresResults',
  async (params: { genres: Genre[]; page: number }) => {
    const { genres, page } = params;
    const results = await resultsService.fetchMovieGenreResults(genres, page);
    return results;
  },
);

export const fetchShowGenresResults = createAsyncThunk(
  'results/fetchShowGenresResults',
  async (params: { genres: Genre[]; page: number }) => {
    const { genres, page } = params;
    const results = await resultsService.fetchShowGenreResults(genres, page);
    return results;
  },
);

export const fetchSearchResults = createAsyncThunk(
  'results/fetchSearchResults',
  async (params: { query: string; page: number }) => {
    const { query, page } = params;
    const results = await resultsService.fetchSearchResults(query, page);
    return results;
  },
);

export const extraReducers = (builder: ActionReducerMapBuilder<ResultsState>) => {
  builder.addCase(fetchMovieGenresResults.fulfilled, (state, action) => {
    const {
      payload,
      meta: { requestStatus },
    } = action;

    state.movieGenreResults.results = [...state.movieGenreResults.results, ...payload];
    state.movieGenreResults.status = requestStatus;
  });

  builder.addCase(fetchShowGenresResults.fulfilled, (state, action) => {
    const {
      payload,
      meta: { requestStatus },
    } = action;

    state.showGenreResults.results = [...state.showGenreResults.results, ...payload];
    state.showGenreResults.status = requestStatus;
  });

  builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
    const {
      payload,
      meta: { requestStatus },
    } = action;

    state.searchResults.results = [...state.searchResults.results, ...payload];
    state.searchResults.status = requestStatus;
  });

  builder.addCase(fetchMovieGenresResults.rejected, (state, action) => {
    state.movieGenreResults.results = [];
    state.movieGenreResults.status = action.meta.requestStatus;
  });

  builder.addCase(fetchShowGenresResults.rejected, (state, action) => {
    state.showGenreResults.results = [];
    state.showGenreResults.status = action.meta.requestStatus;
  });

  builder.addCase(fetchSearchResults.rejected, (state, action) => {
    state.searchResults.results = [];
    state.searchResults.status = action.meta.requestStatus;
  });
};
