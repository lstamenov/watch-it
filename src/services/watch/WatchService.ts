import { AxiosStatic } from 'axios';
import { i18n } from 'i18next';
import { Movie, TvShow } from '../../types/types';
import MovieService from '../movies/MovieService';
import ShowService from '../shows/ShowService';
import Service from '../types/Service';

export default class WatchService extends Service {
  private movieService: MovieService;

  private showService: ShowService;

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

  async fetchMovie(
    id: number,
  ): Promise<{ movie: Movie; similar: Movie[]; recommendations: Movie[] }> {
    const movie: Movie = await this.movieService.fetchById(id);
    const recommendations: Movie[] = await this.movieService.fetchRecommendations(id);
    const similar: Movie[] = await this.movieService.fetchSimilar(id);

    return { movie, recommendations, similar };
  }

  async fetchShow(
    id: number,
  ): Promise<{ show: TvShow; similar: TvShow[]; recommendations: TvShow[] }> {
    const show: TvShow = await this.showService.fetchById(id);
    const recommendations: TvShow[] = await this.showService.fetchRecommendations(id);
    const similar: TvShow[] = await this.showService.fetchSimilar(id);

    return { show, recommendations, similar };
  }
}
