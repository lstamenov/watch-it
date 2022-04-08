import { RootState } from '../store';

export const selectUser = (state: RootState) => state.user.user;

export const selectMessage = (state: RootState) => state.user.message;