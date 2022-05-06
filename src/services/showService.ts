import axios from 'axios';
import { POPULAR_SHOWS_URL, SEASON_URL, SHOW_CAST_URL, SHOW_TRAILER_URL, SHOW_URL, TOP_RATED_SHOWS_URL } from './constants';

export const fetchPopularShows = () => axios.get(POPULAR_SHOWS_URL);
export const fetchTopRatedShows = () => axios.get(TOP_RATED_SHOWS_URL);
export const fetchFullDetailedShowById = (id: number) => axios.get(SHOW_URL(id));
export const fetchFullDetailedSeason = (showId: number, seasonNumber: number) => axios.get(SEASON_URL(showId, seasonNumber));
export const fetchShowTrailers = (id: number) => axios.get(SHOW_TRAILER_URL(id));
export const fetchShowCast = (id: number) => axios.get(SHOW_CAST_URL(id));