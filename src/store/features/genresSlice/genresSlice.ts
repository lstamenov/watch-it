import { createSlice } from '@reduxjs/toolkit';
import { Genre, Status } from '../../../types/types';
import { extraReducers } from './thunk';

export type GenresState = {
  movieGenres: Genre[];
  showGenres: Genre[];
  status: Status;
};

const initialState: GenresState = {
  movieGenres: [],
  showGenres: [],
  status: 'pending',
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers,
});

export default genresSlice.reducer;
