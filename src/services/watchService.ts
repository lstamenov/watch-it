import axios from 'axios';
import { LOAD_MOVIE_RECOMMENDATIONS, LOAD_SHOW_EXTERNAL_LINKS, LOAD_SHOW_RECOMMENDATIONS, LOAD_SIMILAR_MOVIES, LOAD_SIMILAR_SHOWS } from './constants';
import { fetchFullDetailedShowById } from './showService';
import { fetchFullMovieDetailsById } from './movieService';
import i18n from '../i18n/i18n';

export const fetchShowExternalLinks = (id: number) => axios.get(LOAD_SHOW_EXTERNAL_LINKS(id, i18n.language));
export const fetchSimilarMovies = (id: number) => axios.get(LOAD_SIMILAR_MOVIES(id, i18n.language));
export const fetchMovieRecommendations = (id: number) => axios.get(LOAD_MOVIE_RECOMMENDATIONS(id, i18n.language));
export const fetchSimilarShows = (id: number) => axios.get(LOAD_SIMILAR_SHOWS(id, i18n.language));
export const fetchShowRecommendations = (id: number) => axios.get(LOAD_SHOW_RECOMMENDATIONS(id, i18n.language));

export { fetchFullDetailedShowById as fetchShowById, fetchFullMovieDetailsById as fetchMovieById }; 