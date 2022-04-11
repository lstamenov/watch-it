import axios from 'axios';
import { GENRE_RESULTS_URL, LOAD_MORE_MOVIE_GENRE_RESULTS, LOAD_MORE_SHOW_GENRE_RESULTS, LOAD_SEARCH_RESULTS, SHOW_GENRE_RESULTS_URL } from './constants';

export const fetchGenreResults = (genres: string) => axios.get(`${GENRE_RESULTS_URL}${genres}`);
export const fetchShowGenreResults = (genres: string) => axios.get(`${SHOW_GENRE_RESULTS_URL}${genres}`);
export const fetchMoreMovieGenreResults = (genres: string, page: number) => axios.get(`${LOAD_MORE_MOVIE_GENRE_RESULTS(page)}${genres}`);
export const fetchMoreShowGenreResults = (genres: string, page: number) => axios.get(`${LOAD_MORE_SHOW_GENRE_RESULTS(page)}${genres}`);
export const fetchSearchResults = (query: string, page: number) => axios.get(LOAD_SEARCH_RESULTS(query, page));