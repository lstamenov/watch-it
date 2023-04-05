import { createSlice } from '@reduxjs/toolkit';
import { User } from './types';
import { extraReducers } from './thunk';
import { Status } from '../../../types/types';

export type UserState = {
  user: User | null;
  jwt: string | null;
  status: Status;
  error: null | {
    message: string;
  };
};

const initialState: UserState = {
  user: null,
  jwt: null,
  status: 'rejected',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers,
});

export default userSlice.reducer;
