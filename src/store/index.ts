import {
  usePopularMovies,
  useTopRatedMovies,
  useTrendingMovies,
} from './features/moviesSlice/hooks';
import { usePopularShows, useTopRatedShows, useTrendingShows } from './features/showsSlice/hooks';
import { useUser } from './features/userSlice/hooks';
import {
  useMovieGenreResults,
  useSearchResults,
  useShowGenreResults,
} from './features/resultsSlice/hooks';
import { useGenres } from './features/genresSlice/hooks';
import { useWatchMovie, useWatchShow } from './features/watchSlice/hooks';
import { fetchTrending } from './features/trendingSlice/thunk';

export {
  usePopularMovies,
  useTopRatedMovies,
  useTrendingMovies,
  useUser,
  usePopularShows,
  useTopRatedShows,
  useTrendingShows,
  useMovieGenreResults,
  useSearchResults,
  useShowGenreResults,
  useGenres,
  useWatchMovie,
  useWatchShow,
  fetchTrending,
};
