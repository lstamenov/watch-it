import axios from 'axios';
import { LOAD_MOVIE_RECOMMENDATIONS, LOAD_SHOW_EXTERNAL_LINKS, LOAD_SHOW_RECOMMENDATIONS, LOAD_SIMILAR_MOVIES, LOAD_SIMILAR_SHOWS } from './constants';
import { fetchFullDetailedShowById } from './showService';
import { fetchFullMovieDetailsById } from './movieService';

export const fetchShowExternalLinks = (id: number) => axios.get(LOAD_SHOW_EXTERNAL_LINKS(id));
export const fetchSimilarMovies = (id: number) => axios.get(LOAD_SIMILAR_MOVIES(id));
export const fetchMovieRecommendations = (id: number) => axios.get(LOAD_MOVIE_RECOMMENDATIONS(id));
export const fetchSimilarShows = (id: number) => axios.get(LOAD_SIMILAR_SHOWS(id));
export const fetchShowRecommendations = (id: number) => axios.get(LOAD_SHOW_RECOMMENDATIONS(id));

export { fetchFullDetailedShowById as fetchShowById, fetchFullMovieDetailsById as fetchMovieById }; 