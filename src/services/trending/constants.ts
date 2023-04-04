import { API_KEY } from '../constants';

export const TRENDING_WEEKLY = (lang: string, page: number): string =>
  `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=${lang}&page=${page}`;
