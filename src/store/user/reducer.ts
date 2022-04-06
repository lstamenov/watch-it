/* eslint-disable @typescript-eslint/default-param-last */
import { UserDispatchTypes, UserActionTypes, UserState } from './types';

const initialState: UserState = {
  user: null,
};

export default (state: UserState = initialState, action: UserDispatchTypes) => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { user: action.payload.user };
    case UserActionTypes.LOGOUT:
      return initialState;
    default:
      return state;  
  }
};