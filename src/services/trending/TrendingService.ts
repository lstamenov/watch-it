import Service from '../types/Service';
import MovieService from '../movies/MovieService';
import ShowService from '../shows/ShowService';
import { AxiosStatic } from 'axios';
import { i18n } from 'i18next';
import { Movie, TvShow } from '../../types/types';
import { TRENDING_WEEKLY } from './constants';

export default class TrendingService extends Service {
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

  async fetchTrending(page: number): Promise<(Movie | TvShow)[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(TRENDING_WEEKLY(lang, page));
    const trending: (Movie | TvShow)[] = await response.data.results;
    const fullDetailedTrendingResponse = trending.map(async (t) => {
      if (t.media_type === 'movie') {
        const fullDetailed = await this.movieService.fetchById(t.id);
        return fullDetailed;
      } else {
        const fullDetailed = await this.showService.fetchById(t.id);
        return fullDetailed;
      }
    });

    const fullDetailed = await Promise.all(fullDetailedTrendingResponse);
    return fullDetailed;
  }
}
