import { LoadingActionTypes } from './types';

export const loading = () => ({
  type: LoadingActionTypes.LOADING,
  payload: {},
});

export const loaded = () => ({
  type: LoadingActionTypes.LOADED,
  payload: {},
});
