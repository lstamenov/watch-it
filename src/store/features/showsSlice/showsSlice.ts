import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './thunk';
import { Status, TvShow } from '../../../types/types';

export interface ShowsState {
  trending: {
    shows: TvShow[];
    status: Status;
  };
  popular: {
    shows: TvShow[];
    status: Status;
  };
  topRated: {
    shows: TvShow[];
    status: Status;
  };
}

const initialState: ShowsState = {
  trending: {
    shows: [],
    status: 'pending',
  },
  popular: {
    shows: [],
    status: 'pending',
  },
  topRated: {
    shows: [],
    status: 'pending',
  },
};

export const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {},
  extraReducers,
});

export default showsSlice.reducer;
