export const API_KEY: string = '9467dada6c562150e0606a619c9ba8ff';
export const API_URL_PROD = 'https://watch-it-server.herokuapp.com';
export const API_URL_DEV = 'http://localhost:8080';
export const API_URL = API_URL_PROD;

export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const REGISTER_URL = `${API_URL}/register`;
export const AUTH_URL = `${API_URL}/user`;

export const TRENDING_DAILY_MOVIES_URL: string = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=`;
export const TRENDING_WEEKLY_MOVIES_URL: string = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=`;
export const POPULAR_MOVIES_URL: string = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;
export const LATEST_MOVIES_URL: string = `https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}&language=en-US&page=`;
export const UPCOMING_MOVIES_URL: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=`;
export const MOVIE_URL = (id: number) => `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

export const POPULAR_SHOWS_URL: string = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
export const TOP_RATED_SHOWS_URL: string = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
export const SHOW_URL = (id: number) => `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`;
export const SEASON_URL = (tvId: number, seasonNumber: number) => `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`;

export const MOVIE_GENRES_URL: string = ` https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
export const TV_GENRES_URL: string = ` https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

export const TRENDING_DAILY_TV = ` https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`;
export const TRENDING_WEEKLY_TV = ` https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`;
export const TRENDING_DAILY = ` https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
export const TRENDING_WEEKLY = ` https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
export const MORE_TRENDING_WEEKLY = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=`; 

export const GENRE_RESULTS_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=`; 
export const SHOW_GENRE_RESULTS_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=`; 
export const LOAD_MORE_MOVIE_GENRE_RESULTS = (page: number) => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=`;
export const LOAD_MORE_SHOW_GENRE_RESULTS = (page: number) => `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=`;

export const LOAD_SHOW_EXTERNAL_LINKS = (id: number) => `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${API_KEY}&language=en-US`;
export const LOAD_SIMILAR_MOVIES = (id: number) => ` https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
export const LOAD_MOVIE_RECOMMENDATIONS = (id: number) => ` https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
export const LOAD_SIMILAR_SHOWS = (id: number) => ` https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
export const LOAD_SHOW_RECOMMENDATIONS = (id: number) => ` https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;