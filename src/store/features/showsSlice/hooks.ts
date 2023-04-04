import { loadPopularShows, loadTopRatedShows, loadTrendingShows } from './thunk';
import { useAppDispatch, useAppSelector } from '../../store';

export const useTrendingShows = () => {
  const dispatch = useAppDispatch();

  return {
    trendingShowsData: useAppSelector((state) => state.shows.trending),
    loadTrendingShows: () => dispatch(loadTrendingShows()),
  };
};

export const usePopularShows = () => {
  const dispatch = useAppDispatch();

  return {
    popularShowsData: useAppSelector((state) => state.shows.popular),
    loadPopularShows: () => dispatch(loadPopularShows()),
  };
};

export const useTopRatedShows = () => {
  const dispatch = useAppDispatch();

  return {
    topRatedShowsData: useAppSelector((state) => state.shows.topRated),
    loadTopRatedShows: () => dispatch(loadTopRatedShows()),
  };
};
