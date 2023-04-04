import { API_KEY } from '../constants';

export const LOAD_MOVIE_GENRE_RESULTS = (page: number, lang: string, genres: string) =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genres}`;
export const LOAD_SHOW_GENRE_RESULTS = (page: number, lang: string, genres: string) =>
  `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genres}`;
export const LOAD_SEARCH_RESULTS = (query: string, page: number, lang: string) =>
  `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=${lang}&query=${query}&page=${page}&include_adult=false`;
