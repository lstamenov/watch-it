import Service from '../types/Service';
import { Movie, TvShow } from '../../types/types';

export default class TrendingService extends Service {
  async fetchTrending(page: number): Promise<(Movie | TvShow)[]> {
    const { language } = this.translator;
    const response = await this.fetcher.get(this.buildUrl('trending/all'), {
      params: { language, page },
    });

    return response.data;
  }
}
