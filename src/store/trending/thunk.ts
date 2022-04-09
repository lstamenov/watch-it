import { Dispatch } from 'redux';
import * as service from '../../services/trendingService';
import * as showService from '../../services/showService';
import * as movieService from '../../services/movieService';
import { Genre, TrendingMovie, TrendingShow } from '../../types/types';
import { getMoreWeeklyTrending, getWeeklyTrending } from './actions';

const fetchMovieGenresById = async (id: number) => {
  const fullMovieResponse = await movieService.fetchFullMovieDetailsById(id);
  const genres: Genre[] = await fullMovieResponse.data.genres;
  return genres;
};

const fetchShowGenresById = async (id: number) => {
  const response = await showService.fetchFullDetailedShowById(id);
  const genres: Genre[] = await response.data.genres;
  return genres;
};

export const loadWeeklyTrending = () => async (dispatch: Dispatch) => {
  const response = await service.fetchWeeklyTrending();
  console.log(`first - ${response}`);
  console.log(response);
  
  const trending: (TrendingMovie | TrendingShow)[] = await response.data.results;
  const trendingWithGenresResponse = trending.map(async trend => {
    if (trend.media_type === 'tv') {
      const genres: Genre[] = await fetchShowGenresById(trend.id);
      return { ...trend, genres };  
    }
    const genres: Genre[] = await fetchMovieGenresById(trend.id);
    return { ...trend, genres };
  });
  const trendingWithGenres = await Promise.all(trendingWithGenresResponse);
  dispatch(getWeeklyTrending(trendingWithGenres, 1));
};

export const loadMoreWeeklyTrending = (page: number) => async (dispatch: Dispatch) => {
  const response = await service.fetchMoreWeeklyTrending(page);
  console.log(`second - ${page} page`);
  console.log(response);
  
  const trending: (TrendingMovie | TrendingShow)[] = await response.data.results;
  const trendingWithGenresResponse = trending.map(async trend => {
    if (trend.media_type === 'tv') {
      const genres: Genre[] = await fetchShowGenresById(trend.id);
      return { ...trend, genres };
    }
    const genres: Genre[] = await fetchMovieGenresById(trend.id);
    return { ...trend, genres };
  });
  const trendingWithGenres = await Promise.all(trendingWithGenresResponse);
  dispatch(getMoreWeeklyTrending(trendingWithGenres, response.data.page));
};