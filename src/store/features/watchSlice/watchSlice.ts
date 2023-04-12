import { createSlice } from '@reduxjs/toolkit';
import { Status, TvShow, Movie } from '../../../types/types';
import { extraReducers } from './thunk';

export type WatchState = {
  movie: {
    movie: Movie | null;
    recommendations: Movie[];
    similar: Movie[];
    status: Status;
  };
  show: {
    show: TvShow | null;
    recommendations: TvShow[];
    similar: TvShow[];
    status: Status;
  };
};

const initialState: WatchState = {
  movie: {
    movie: null,
    recommendations: [],
    similar: [],
    status: 'pending',
  },
  show: {
    show: null,
    recommendations: [],
    similar: [],
    status: 'pending',
  },
};

const watchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {
    clear: (state) => {
      state.movie = {
        movie: null,
        recommendations: [],
        similar: [],
        status: 'pending',
      };
      state.show = {
        show: null,
        recommendations: [],
        similar: [],
        status: 'pending',
      };
    },
  },
  extraReducers,
});

export const { clear } = watchSlice.actions;

export default watchSlice.reducer;
