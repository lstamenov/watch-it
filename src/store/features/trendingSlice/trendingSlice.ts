import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './thunk';
import { Status, TvShow, Movie } from '../../../types/types';

export type TrendingState = {
  trending: (TvShow | Movie)[];
  status: Status;
};

const initialState: TrendingState = {
  trending: [],
  status: 'pending',
};

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    clear: (state) => {
      state.status = 'pending';
      state.trending = [];
    },
  },
  extraReducers,
});

export const { clear } = trendingSlice.actions;

export default trendingSlice.reducer;
