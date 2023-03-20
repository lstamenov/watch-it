import axios from 'axios';
import { TV_GENRES_URL, MOVIE_GENRES_URL } from './constants';
import i18n from '../i18n/i18n';

export const fetchMovieGenres = () => axios.get(MOVIE_GENRES_URL(i18n.language));
export const fetchTvGenres = () => axios.get(TV_GENRES_URL(i18n.language));
