import { API_KEY } from '../constants';

export const POPULAR_SHOWS_URL = (lang: string) =>
  `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=${lang}&page=1`;
export const TOP_RATED_SHOWS_URL = (lang: string) =>
  `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=${lang}&page=1`;
export const TRENDING_SHOWS_URL = (lang: string) =>
  `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=${lang}&page=1`;
export const SHOW_URL = (id: number, lang: string) =>
  `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=${lang}`;
export const SEASON_URL = (tvId: number, seasonNumber: number, lang: string) =>
  `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=${lang}`;
export const LOAD_SHOW_EXTERNAL_LINKS = (id: number) =>
  `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${API_KEY}&language=en-US`;
export const LOAD_SIMILAR_SHOWS = (id: number, lang: string) =>
  `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=${lang}&page=1`;
export const LOAD_SHOW_RECOMMENDATIONS = (id: number, lang: string) =>
  `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=${lang}&page=1`;
