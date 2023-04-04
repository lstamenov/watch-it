import { AxiosStatic } from 'axios';
import { i18n } from 'i18next';
import { Genre, Movie, TvShow } from '../../types/types';
import MovieService from '../movies/MovieService';
import ShowService from '../shows/ShowService';
import Service from '../types/Service';
import {
  LOAD_MOVIE_GENRE_RESULTS,
  LOAD_SHOW_GENRE_RESULTS,
  LOAD_SEARCH_RESULTS,
} from './constants';

export default class ResultsService extends Service {
  private showService: ShowService;

  private movieService: MovieService;

  constructor(
    fetcher: AxiosStatic,
    translator: i18n,
    movieService: MovieService,
    showService: ShowService,
  ) {
    super(fetcher, translator);
    this.movieService = movieService;
    this.showService = showService;
  }

  private getGenresAsStringQuery(genres: Genre[]): string {
    const genreIds = genres.map((genre) => genre.id);
    const genresAsString = genreIds.join('%2C');
    return genresAsString;
  }

  async fetchMovieGenreResults(genres: Genre[], page = 1): Promise<Movie[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(
      LOAD_MOVIE_GENRE_RESULTS(page, lang, this.getGenresAsStringQuery(genres)),
    );
    const results: Movie[] = await response.data.results;
    const detailedResults = await this.movieService.fetchFullDetailed(results);
    return detailedResults;
  }

  async fetchShowGenreResults(genres: Genre[], page = 1): Promise<TvShow[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(
      LOAD_SHOW_GENRE_RESULTS(page, lang, this.getGenresAsStringQuery(genres)),
    );
    const results: TvShow[] = await response.data.results;
    const detailedResults = await this.showService.fetchFullDetailed(results);
    return detailedResults;
  }

  async fetchSearchResults(query: string, page = 1): Promise<(Movie | TvShow)[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(LOAD_SEARCH_RESULTS(query, page, lang));
    const results: (Movie | TvShow)[] = await response.data.results;
    const detailedResultsResponse = results
      .filter((res, index, self) => res.media_type !== 'person' && index !== self.length - 1)
      .map(async (movie) => {
        if (movie.media_type === 'movie') {
          const fullDetailedMovie = await this.movieService.fetchById(movie.id);
          return fullDetailedMovie;
        }

        const fullDetailedShow = await this.showService.fetchById(movie.id);
        return fullDetailedShow;
      });
    const detailedResponse = await Promise.all(detailedResultsResponse);
    return detailedResponse;
  }
}
