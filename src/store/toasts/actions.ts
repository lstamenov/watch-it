import { ToastsActionTypes } from './types';

export const enqueMessage = (message: string, type: string) => ({
  type: ToastsActionTypes.SET_MESSAGE,
  payload: {
    message,
    type,
  },
});