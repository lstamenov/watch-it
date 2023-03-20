export interface ToastsState {
  message: string | null;
  type: 'success' | 'warning' | 'error';
}

export enum ToastsActionTypes {
  SET_MESSAGE = 'SET_MESSAGE',
}

export interface ToastsAction {
  type: ToastsActionTypes;
  payload: {
    message: string;
    type: ToastsState['type'];
  };
}
