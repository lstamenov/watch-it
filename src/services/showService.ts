import axios from 'axios';
import {
  POPULAR_SHOWS_URL,
  SEASON_URL,
  SHOW_CAST_URL,
  SHOW_TRAILER_URL,
  SHOW_URL,
  TOP_RATED_SHOWS_URL,
} from './constants';
import i18n from '../i18n/i18n';

export const fetchPopularShows = () => axios.get(POPULAR_SHOWS_URL(i18n.language));
export const fetchTopRatedShows = () => axios.get(TOP_RATED_SHOWS_URL(i18n.language));
export const fetchFullDetailedShowById = (id: number) => axios.get(SHOW_URL(id, i18n.language));
export const fetchFullDetailedSeason = async (showId: number, seasonNumber: number) => {
  const response = await axios.get(SEASON_URL(showId, seasonNumber, i18n.language));
  return response.data;
};
export const fetchShowTrailers = (id: number) => axios.get(SHOW_TRAILER_URL(id, i18n.language));
export const fetchShowCast = (id: number) => axios.get(SHOW_CAST_URL(id, i18n.language));
