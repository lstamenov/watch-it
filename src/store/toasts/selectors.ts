import { RootState } from '../store';

export const selectToastMessage = (state: RootState) => state.toastMessages;
