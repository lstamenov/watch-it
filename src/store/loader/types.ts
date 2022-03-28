export interface LoaderState {
  isLoading: boolean,
}

export enum LoadingActionTypes {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface LoadingAction {
  type: LoadingActionTypes,
  payload: Object,
}