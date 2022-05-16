/* eslint-disable @typescript-eslint/default-param-last */
import { UserDispatchTypes, UserActionTypes, UserState } from './types';

const initialState: UserState = {
  user: null,
  message: '',
};

export default (state: UserState = initialState, action: UserDispatchTypes) => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { ...initialState, user: action.payload.user };
    case UserActionTypes.LOGIN_FAILED:
      return { ...initialState, message: action.payload.message };
    case UserActionTypes.LOGOUT:
      return initialState;
    case UserActionTypes.REGISTER:
      return state;
    case UserActionTypes.REGISTER_FAILED:
      return { ...initialState, message: action.payload.message };
    case UserActionTypes.AUTH:
      console.log(action.payload.user);
      
      return { ...initialState, user: action.payload.user };
    case UserActionTypes.AUTH_FAILED:
      return { ...initialState, message: action.payload.message };
    default:
      return state;  
  }
};