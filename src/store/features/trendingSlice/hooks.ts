import { useAppDispatch, useAppSelector } from '../../store';
import { fetchTrending } from './thunk';
import { clear } from './trendingSlice';

export const useTrending = () => {
  const dispatch = useAppDispatch();

  return {
    trending: useAppSelector((state) => state.trending),
    clear: () => dispatch(clear()),
    loadTrending: (page: number) => dispatch(fetchTrending(page)),
  };
};
