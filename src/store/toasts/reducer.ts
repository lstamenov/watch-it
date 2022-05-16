/* eslint-disable @typescript-eslint/default-param-last */
import { ToastsAction, ToastsActionTypes, ToastsState } from './types';

const initialState: ToastsState = {
  message: null,
};

const toastsReducer = (
  state: ToastsState = initialState,
  action: ToastsAction,
) => {
  switch (action.type) {
    case ToastsActionTypes.SET_MESSAGE:
      console.log(action);
      
      return { ...state,  message: action.payload.message };
    default:
      return state;
  }
};

export default toastsReducer;
