import axios from 'axios';
import { TV_GENRES_URL, MOVIE_GENRES_URL } from './constants';

export const fetchMovieGenres = () => axios.get(MOVIE_GENRES_URL);
export const fetchTvGenres = () => axios.get(TV_GENRES_URL);