import { ActionReducerMapBuilder, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from '../../../i18n/i18n';
import TrendingService from '../../../services/trending/TrendingService';
import { TrendingState } from './trendingSlice';

const trendingService: TrendingService = new TrendingService(axios, i18n);

export const fetchTrending = createAsyncThunk('trending/fetchTrending', async (page: number) => {
  const trending = await trendingService.fetchTrending(page);
  return trending;
});

export const clearState = createAction('trending/clear');

export const extraReducers = (builder: ActionReducerMapBuilder<TrendingState>) => {
  builder.addCase(fetchTrending.fulfilled, (state, action) => {
    state.trending = [...state.trending, ...action.payload];
    state.status = action.meta.requestStatus;
  });

  builder.addCase(fetchTrending.pending, (state, action) => {
    state.status = action.meta.requestStatus;
  });

  builder.addCase(fetchTrending.rejected, (state, action) => {
    state.status = action.meta.requestStatus;
  });
};
