import { Movie } from '../../types/types';
import Service from '../types/Service';
import { LOAD_MOVIE_RECOMMENDATIONS, LOAD_SIMILAR_MOVIES, MOVIE_URL } from './constants';

export default class MovieService extends Service {
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

  private async fetchMovies(path: string, page = 1): Promise<Movie[]> {
    const language = this.translator.language;
    const response = await this.fetcher.get(this.buildUrl(path), {
      params: { language, page },
    });
    return response.data;
  }

  async fetchTopRated(): Promise<Movie[]> {
    return this.fetchMovies('movies/top-rated');
  }

  async fetchPopular(): Promise<Movie[]> {
    return this.fetchMovies('movies/popular');
  }

  async fetchTrending(): Promise<Movie[]> {
    return this.fetchMovies('trending/movies');
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
