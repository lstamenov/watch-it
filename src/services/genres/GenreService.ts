import { Genre } from '../../types/types';
import Service from '../types/Service';
import { MOVIE_GENRES_URL, TV_GENRES_URL } from './constants';

export default class GenreService extends Service {
  async fetchMovieGenres(): Promise<Genre[]> {
    const lang = this.translator.language;
    const response = await this.fetcher(MOVIE_GENRES_URL(lang));
    return response.data.genres;
  }

  async fetchShowGenres(): Promise<Genre[]> {
    const lang = this.translator.language;
    const response = await this.fetcher(TV_GENRES_URL(lang));
    return response.data.genres;
  }
}
