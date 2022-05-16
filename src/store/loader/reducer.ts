/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/default-param-last */
import { LoaderState, LoadingAction, LoadingActionTypes } from './types';

const initialState: LoaderState = {
  isLoading: false,
};

export default (state: LoaderState = initialState, action: LoadingAction) => {
  switch (action.type) {
    case LoadingActionTypes.LOADED:
      return { isLoading: false };
    case LoadingActionTypes.LOADING:
      return { isLoading: true };
    default:
      return state;
  }
};