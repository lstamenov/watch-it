export interface ToastsState {
  message: string | null;
}

export enum ToastsActionTypes {
  SET_MESSAGE,
}

export interface ToastsAction {
  type: ToastsActionTypes,
  payload: {
    message: string,
  }
}