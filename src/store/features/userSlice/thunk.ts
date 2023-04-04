import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from '../../../i18n/i18n';
import MovieService from '../../../services/movies/MovieService';
import ShowService from '../../../services/shows/ShowService';
import UserService from '../../../services/user/UserService';
import { LoginCredentials, RegisterCredentials } from '../../../types/types';
import { UserState } from './userSlice';

const movieService: MovieService = new MovieService(axios, i18n);
const showService: ShowService = new ShowService(axios, i18n);
const userService: UserService = new UserService(axios, i18n, showService, movieService);

export const login = createAsyncThunk('user/login', async (credentials: LoginCredentials) => {
  const { user, jwt } = await userService.login(credentials);
  localStorage.setItem('jwt', jwt);
  return { user, jwt };
});

export const register = createAsyncThunk(
  'user/register',
  async (credentials: RegisterCredentials) => {
    userService.register(credentials);
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  userService.logout();
});

export const authenticateUser = createAsyncThunk('user/auth', async () => {
  const { user, jwt } = await userService.authenticateUser();
  return { user, jwt };
});

export const addMovieToList = createAsyncThunk('user/addMovieToList', async (id: number) => {
  userService.addMovieToList(id);
});

export const addShowToList = createAsyncThunk('user/addShowToList', async (id: number) => {
  userService.addShowToList(id);
});

export const removeMovieFromList = createAsyncThunk('user/removeMovie', async (id: number) => {
  userService.removeMovieFromList(id);
});

export const removeShowFromList = createAsyncThunk('user/removeShow', async (id: number) => {
  userService.removeShowfromList(id);
});

export const changeAvatar = createAsyncThunk('user/changeAvatar', async (avatar: string) => {
  userService.changeAvatar(avatar);
});

export const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(login.fulfilled, (state, action) => {
    const {
      payload: { user, jwt },
      meta: { requestStatus },
    } = action;
    state.jwt = jwt;
    state.user = user;
    state.status = requestStatus;
  });

  builder.addCase(authenticateUser.fulfilled, (state, action) => {
    const {
      payload: { user, jwt },
      meta: { requestStatus },
    } = action;
    state.jwt = jwt;
    state.user = user;
    state.status = requestStatus;
  });

  builder.addCase(login.rejected, (state, action) => {
    state.jwt = null;
    state.user = null;
    state.status = action.meta.requestStatus;
  });

  builder.addCase(authenticateUser.rejected, (state, action) => {
    state.jwt = null;
    state.user = null;
    state.status = action.meta.requestStatus;
  });

  builder.addCase(register.fulfilled, (state, action) => {
    const {
      meta: { requestStatus },
    } = action;
    state.status = requestStatus;
  });

  builder.addCase(register.rejected, (state, action) => {
    state.status = action.meta.requestStatus;
  });

  builder.addCase(logout.fulfilled, (state, action) => {
    state.status = action.meta.requestStatus;
    state.jwt = null;
    state.user = null;
  });

  builder.addCase(addMovieToList.fulfilled, (state, action) => {
    state.status = action.meta.requestStatus;
  });

  builder.addCase(addShowToList.fulfilled, (state, action) => {
    state.status = action.meta.requestStatus;
  });

  builder.addCase(removeMovieFromList.fulfilled, (state, action) => {
    state.status = action.meta.requestStatus;
  });

  builder.addCase(removeShowFromList.fulfilled, (state, action) => {
    state.status = action.meta.requestStatus;
  });

  builder.addCase(changeAvatar.fulfilled, (state, action) => {
    state.status = action.meta.requestStatus;
  });

  builder.addCase(login.pending, (state, action) => {
    state.status = action.meta.requestStatus;
  });

  builder.addCase(register.pending, (state, action) => {
    state.status = action.meta.requestStatus;
  });

  builder.addCase(authenticateUser.pending, (state, action) => {
    state.status = action.meta.requestStatus;
  });
};