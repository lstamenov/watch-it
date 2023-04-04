import { loadPopularMovies, loadTopRatedMovies, loadTrendingMovies } from './thunk';
import { useAppDispatch, useAppSelector } from '../../store';

export const useTrendingMovies = () => {
  const dispatch = useAppDispatch();

  return {
    trendingMoviesData: useAppSelector((state) => state.movies.trending),
    loadTrendingMovies: () => dispatch(loadTrendingMovies()),
  };
};

export const usePopularMovies = () => {
  const dispatch = useAppDispatch();

  return {
    popularMoviesData: useAppSelector((state) => state.movies.popular),
    loadPopularMovies: () => dispatch(loadPopularMovies()),
  };
};

export const useTopRatedMovies = () => {
  const dispatch = useAppDispatch();

  return {
    topRatedMoviesData: useAppSelector((state) => state.movies.topRated),
    loadTopRatedMovies: () => dispatch(loadTopRatedMovies()),
  };
};
