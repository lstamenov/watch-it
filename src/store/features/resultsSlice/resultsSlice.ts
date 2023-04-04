import { createSlice } from '@reduxjs/toolkit';
import { Status, TvShow, Movie } from '../../../types/types';
import { extraReducers } from './thunk';

export type ResultsState = {
  movieGenreResults: {
    results: Movie[];
    status: Status;
  };
  showGenreResults: {
    results: TvShow[];
    status: Status;
  };
  searchResults: {
    results: (Movie | TvShow)[];
    status: Status;
  };
};

const initialState: ResultsState = {
  movieGenreResults: {
    results: [],
    status: 'pending',
  },
  showGenreResults: {
    results: [],
    status: 'pending',
  },
  searchResults: {
    results: [],
    status: 'pending',
  },
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    clearMovieGenreResults: (state) => {
      state.movieGenreResults = {
        results: [],
        status: 'pending',
      };
    },
    clearShowGenreResults: (state) => {
      state.showGenreResults = {
        results: [],
        status: 'pending',
      };
    },
  },
  extraReducers,
});

export const { clearMovieGenreResults, clearShowGenreResults } = resultsSlice.actions;

export default resultsSlice.reducer;
