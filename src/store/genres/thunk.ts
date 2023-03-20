import * as service from '../../services/genreService';
import { Dispatch } from 'redux';
import { getMovieGenres, getTvGenres } from './actions';

export const loadMovieGenres = () => async (dispatch: Dispatch) => {
  const response = await service.fetchMovieGenres();
  dispatch(getMovieGenres(response.data.genres));
};

export const loadTvGenres = () => async (dispatch: Dispatch) => {
  const response = await service.fetchTvGenres();
  dispatch(getTvGenres(response.data.genres));
};

export const loadGenres = () => async (dispatch: Dispatch) => {
  await loadMovieGenres()(dispatch);
  await loadTvGenres()(dispatch);
};
