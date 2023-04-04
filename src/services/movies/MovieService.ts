import { Movie } from '../../types/types';
import ContentService from '../types/ContentService';
import {
  LOAD_MOVIE_RECOMMENDATIONS,
  LOAD_SIMILAR_MOVIES,
  MOVIE_URL,
  POPULAR_MOVIES_URL,
  TOP_RATED_MOVIES_URL,
  TRENDING_MOVIES_URL,
} from './constants';

export default class MovieService extends ContentService<Movie> {
  async fetchById(id: number): Promise<Movie> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(MOVIE_URL(id, lang));
    return response.data;
  }

  async fetchFullDetailed(content: Movie[]): Promise<Movie[]> {
    const fullDetailedMoviesResponse = Promise.all(
      content.map((movie) => this.fetchById(movie.id)),
    );
    return fullDetailedMoviesResponse;
  }

  async fetchTopRated(): Promise<Movie[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(TOP_RATED_MOVIES_URL(lang));
    const fullDetailedMovies = this.fetchFullDetailed(response.data.results);
    return fullDetailedMovies;
  }

  async fetchPopular(): Promise<Movie[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(POPULAR_MOVIES_URL(lang));
    const fullDetailedMovies = this.fetchFullDetailed(response.data.results);
    return fullDetailedMovies;
  }

  async fetchTrending(): Promise<Movie[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(TRENDING_MOVIES_URL(lang));
    const fullDetailedMovies = this.fetchFullDetailed(response.data.results);
    return fullDetailedMovies;
  }

  async fetchRecommendations(id: number): Promise<Movie[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(LOAD_MOVIE_RECOMMENDATIONS(id, lang));
    const fullDetailedMovies = this.fetchFullDetailed(response.data.results);
    return fullDetailedMovies;
  }

  async fetchSimilar(id: number): Promise<Movie[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(LOAD_SIMILAR_MOVIES(id, lang));
    const fullDetailedMovies = this.fetchFullDetailed(response.data.results);
    return fullDetailedMovies;
  }
}
