import { AxiosStatic } from 'axios';
import { i18n } from 'i18next';
import { User } from '../../store/features/userSlice/types';
import { LoginCredentials, Movie, RegisterCredentials, TvShow } from '../../types/types';
import MovieService from '../movies/MovieService';
import ShowService from '../shows/ShowService';
import Service from '../types/Service';
import { getAuthHeaders } from '../utils';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  AUTH_URL,
  ADD_MOVIE_TO_LIST_URL,
  ADD_SHOW_TO_LIST_URL,
  CHANGE_AVATAR,
} from './constants';

export default class UserService extends Service {
  private showService: ShowService;

  private movieService: MovieService;

  constructor(
    fetcher: AxiosStatic,
    translator: i18n,
    showService: ShowService,
    movieService: MovieService,
  ) {
    super(fetcher, translator);
    this.showService = showService;
    this.movieService = movieService;
  }

  private async fetchShows(showIds: number[]): Promise<TvShow[]> {
    const shows = await Promise.all(showIds.map((showId) => this.showService.fetchById(showId)));
    return shows;
  }

  private async fetcMovies(movieIds: number[]): Promise<Movie[]> {
    const movies = await Promise.all(
      movieIds.map((movieId) => this.movieService.fetchById(movieId)),
    );
    return movies;
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; jwt: string }> {
    const response = await this.fetcher.post(LOGIN_URL, credentials);
    const userData: { user: User; jwt: string } = await response.data;
    const movies = await this.fetcMovies(userData.user.moviesList);
    const shows = await this.fetchShows(userData.user.showsList);
    userData.user.list = {
      movies,
      shows,
    };
    return userData;
  }

  register(credentials: RegisterCredentials) {
    this.fetcher.post(REGISTER_URL, credentials);
  }

  logout() {
    this.fetcher.post(LOGOUT_URL, {}, { withCredentials: true });
  }

  async authenticateUser() {
    const response = await this.fetcher.get(AUTH_URL, { headers: getAuthHeaders() });
    const { user, jwt }: { user: User; jwt: string } = response.data;
    const movies = await this.fetcMovies(user.moviesList);
    const shows = await this.fetchShows(user.showsList);
    user.list = {
      movies,
      shows,
    };

    return { user, jwt };
  }

  addMovieToList(id: number) {
    this.fetcher.post(ADD_MOVIE_TO_LIST_URL, { id }, { headers: getAuthHeaders() });
  }

  addShowToList(id: number) {
    this.fetcher.post(ADD_SHOW_TO_LIST_URL, { id }, { headers: getAuthHeaders() });
  }

  removeMovieFromList(id: number) {
    this.fetcher.delete(ADD_MOVIE_TO_LIST_URL, { headers: getAuthHeaders(), data: { id } });
  }

  removeShowfromList(id: number) {
    this.fetcher.delete(ADD_SHOW_TO_LIST_URL, { headers: getAuthHeaders(), data: { id } });
  }

  changeAvatar(avatar: string) {
    this.fetcher.put(CHANGE_AVATAR, { avatar }, { headers: getAuthHeaders() });
  }
}
