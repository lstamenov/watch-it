/* eslint-disable @typescript-eslint/default-param-last */
import { ToastsAction, ToastsActionTypes, ToastsState } from './types';

const initialState: ToastsState = {
  message: null,
  type: 'success',
};

const toastsReducer = (
  state: ToastsState = initialState,
  action: ToastsAction,
) => {
  switch (action.type) {
    case ToastsActionTypes.SET_MESSAGE:
      return { ...state,  message: action.payload.message, type: action.payload.type };
    default:
      return state;
  }
};

export default toastsReducer;
