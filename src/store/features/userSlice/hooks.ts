import { LoginCredentials, RegisterCredentials } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  addMovieToList,
  addShowToList,
  authenticateUser,
  changeAvatar,
  login,
  logout,
  register,
  removeMovieFromList,
  removeShowFromList,
} from './thunk';

export const useUser = () => {
  const dispatch = useAppDispatch();

  return {
    user: useAppSelector((state) => state.user),
    login: (credentials: LoginCredentials) => dispatch(login(credentials)),
    register: (credentials: RegisterCredentials) => dispatch(register(credentials)),
    logout: () => dispatch(logout()),
    authenticate: (shouldReload = false) => dispatch(authenticateUser(shouldReload)),
    addMovieToList: (movieId: number) => dispatch(addMovieToList(movieId)),
    addShowToList: (showId: number) => dispatch(addShowToList(showId)),
    removeMovieFromList: (movieId: number) => dispatch(removeMovieFromList(movieId)),
    removeShowFromList: (showId: number) => dispatch(removeShowFromList(showId)),
    changeAvatar: (avatar: string) => dispatch(changeAvatar(avatar)),
  };
};
