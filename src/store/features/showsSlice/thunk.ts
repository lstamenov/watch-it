import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from '../../../i18n/i18n';
import ShowService from '../../../services/shows/ShowService';
import { ShowsState } from './showsSlice';

const service: ShowService = new ShowService(axios, i18n);

export const loadTrendingShows = createAsyncThunk('shows/loadTrendingShows', async () => {
  const shows = await service.fetchTrending();
  return shows;
});

export const loadPopularShows = createAsyncThunk('shows/loadPopularShows', async () => {
  const shows = await service.fetchPopular();
  return shows;
});

export const loadTopRatedShows = createAsyncThunk('shows/loadTopRatedShows', async () => {
  const shows = await service.fetchTopRated();
  return shows;
});

type StateTypes = 'trending' | 'topRated' | 'popular';

const actions = [
  { f: loadTrendingShows, prop: 'trending' as StateTypes },
  { f: loadPopularShows, prop: 'popular' as StateTypes },
  { f: loadTopRatedShows, prop: 'topRated' as StateTypes },
];

export const extraReducers = (builder: ActionReducerMapBuilder<ShowsState>) => {
  actions.forEach(({ f, prop }) =>
    builder.addCase(f.fulfilled, (state, action) => {
      state[prop].shows = action.payload;
      state[prop].status = action.meta.requestStatus;
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
