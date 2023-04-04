import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './thunk';
import { Movie, Status } from '../../../types/types';

export interface MoviesState {
  trending: {
    movies: Movie[];
    status: Status;
  };
  popular: {
    movies: Movie[];
    status: Status;
  };
  topRated: {
    movies: Movie[];
    status: Status;
  };
}

const initialState: MoviesState = {
  trending: {
    movies: [],
    status: 'pending',
  },
  popular: {
    movies: [],
    status: 'pending',
  },
  topRated: {
    movies: [],
    status: 'pending',
  },
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers,
});

export default moviesSlice.reducer;
