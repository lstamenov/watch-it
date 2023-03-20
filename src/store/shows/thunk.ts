import { Dispatch } from 'redux';
import * as service from '../../services/showService';
import * as trendingService from '../../services/trendingService';
import { TvShow } from '../../types/types';
import { loaded, loading } from '../loader/actions';
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
  const seasonsResponse = Promise.all(
    show.seasons.map((season) => fetchSeason(show.id, season.season_number)),
  );
  const seasons = await seasonsResponse;
  return { ...show, seasons };
};

export const loadPopularShows = () => async (dispatch: Dispatch) => {
  const response = await service.fetchPopularShows();
  const shows: TvShow[] = response.data.results;

  const fullDetailedShowsResponse = Promise.all(shows.map((show) => fetchShowById(show.id)));
  const fullDetailedShows = await fullDetailedShowsResponse;

  const showsWithSeasonsResponse = Promise.all(
    fullDetailedShows.map((show) => fetchShowWithSeasons(show)),
  );
  const showsWithSeasons = await showsWithSeasonsResponse;

  dispatch(popularShowsLoaded(showsWithSeasons));
};

export const loadTopRatedShows = () => async (dispatch: Dispatch) => {
  const response = await service.fetchTopRatedShows();
  const shows: TvShow[] = response.data.results;

  const fullDetailedShowsResponse = Promise.all(shows.map((show) => fetchShowById(show.id)));
  const fullDetailedShows = await fullDetailedShowsResponse;

  const showsWithSeasonsResponse = Promise.all(
    fullDetailedShows.map((show) => fetchShowWithSeasons(show)),
  );
  const showsWithSeasons = await showsWithSeasonsResponse;

  dispatch(topRatedShowsLoaded(showsWithSeasons));
};

export const loadTrendingShows = () => async (dispatch: Dispatch) => {
  const response = await trendingService.fetchWeeklyTrendingTv();
  const shows: TvShow[] = response.data.results;

  const fullDetailedShowsResponse = Promise.all(shows.map((show) => fetchShowById(show.id)));
  const fullDetailedShows = await fullDetailedShowsResponse;

  const showsWithSeasonsResponse = Promise.all(
    fullDetailedShows.map((show) => fetchShowWithSeasons(show)),
  );
  const showsWithSeasons = await showsWithSeasonsResponse;

  dispatch(trendingShowsLoaded(showsWithSeasons));
};

export const loadShowsPageData = () => async (dispatch: Dispatch) => {
  dispatch(loading());
  await loadPopularShows()(dispatch);
  await loadTopRatedShows()(dispatch);
  await loadTrendingShows()(dispatch);
  dispatch(loaded());
};
