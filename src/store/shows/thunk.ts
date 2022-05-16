import { Dispatch } from 'redux';
import * as service from '../../services/showService';
import * as trendingService from '../../services/trendingService';
import { TvShow } from '../../types/types';
import { loaded, loading } from '../loader/actions';
import { RootState } from '../store';
import { popularShowsLoaded, topRatedShowsLoaded, trendingShowsLoaded } from './actions';

const fetchShowById = async (id: number) => {
  const response = await service.fetchFullDetailedShowById(id);
  return response.data;
};

const fetchSeason = async (showId: number, seasonNumber: number) => {
  const response = await service.fetchFullDetailedSeason(showId, seasonNumber);
  return response.data;
};

const fetchShowWithSeasons = async (show: TvShow) => {
  const seasonsResponse = Promise.all(show.seasons.map(season => fetchSeason(show.id, season.season_number)));
  const seasons = await seasonsResponse;
  return { ...show, seasons };
} ;

export const loadPopularShows = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const currentShows = getState().shows.popular;
  if (currentShows.length > 1) return;

  const response = await service.fetchPopularShows();
  const shows: TvShow[] = response.data.results;
  
  const fullDetailedShowsResponse = Promise.all(shows.map(show => fetchShowById(show.id)));
  const fullDetailedShows = await fullDetailedShowsResponse;
  
  const showsWithSeasonsResponse = Promise.all(fullDetailedShows.map(show => fetchShowWithSeasons(show)));
  const showsWithSeasons = await showsWithSeasonsResponse;

  dispatch(popularShowsLoaded(showsWithSeasons));
};

export const loadTopRatedShows = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const currentShows = getState().shows.topRated;
  if (currentShows.length > 1) return;

  const response = await service.fetchTopRatedShows();
  const shows: TvShow[] = response.data.results;
  
  const fullDetailedShowsResponse = Promise.all(shows.map(show => fetchShowById(show.id)));
  const fullDetailedShows = await fullDetailedShowsResponse;
  
  const showsWithSeasonsResponse = Promise.all(fullDetailedShows.map(show => fetchShowWithSeasons(show)));
  const showsWithSeasons = await showsWithSeasonsResponse;

  dispatch(topRatedShowsLoaded(showsWithSeasons));
};

export const loadTrendingShows = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const currentShows = getState().shows.trending;
  if (currentShows.length > 1) return;

  const response = await trendingService.fetchWeeklyTrendingTv();
  const shows: TvShow[] = response.data.results;
  
  const fullDetailedShowsResponse = Promise.all(shows.map(show => fetchShowById(show.id)));
  const fullDetailedShows = await fullDetailedShowsResponse;
  
  const showsWithSeasonsResponse = Promise.all(fullDetailedShows.map(show => fetchShowWithSeasons(show)));
  const showsWithSeasons = await showsWithSeasonsResponse;

  dispatch(trendingShowsLoaded(showsWithSeasons));
};

export const loadShowsPageData = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(loading());
  await loadPopularShows()(dispatch, getState);
  await loadTopRatedShows()(dispatch, getState);
  await loadTrendingShows()(dispatch, getState);
  dispatch(loaded());
};

