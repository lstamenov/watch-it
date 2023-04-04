import { useAppDispatch, useAppSelector } from '../../store';
import { loadMovieGenres, loadShowGenres } from './thunk';

export const useGenres = () => {
  const dispatch = useAppDispatch();

  return {
    genres: useAppSelector((state) => state.genres),
    loadMovieGenres: () => dispatch(loadMovieGenres()),
    loadShowGenres: () => dispatch(loadShowGenres()),
  };
};
