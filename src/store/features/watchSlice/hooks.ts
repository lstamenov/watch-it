import { useAppDispatch, useAppSelector } from '../../store';
import { fetchMovie, fetchShow } from './thunk';

export const useWatchMovie = () => {
  const dispatch = useAppDispatch();

  return {
    movieData: useAppSelector((state) => state.watch.movie),
    loadMovie: (id: number) => dispatch(fetchMovie(id)),
  };
};

export const useWatchShow = () => {
  const dispatch = useAppDispatch();

  return {
    showData: useAppSelector((state) => state.watch.show),
    loadShow: (id: number) => dispatch(fetchShow(id)),
  };
};
