import { Season, TvShow } from '../../types/types';
import Service from '../types/Service';
import {
  LOAD_SHOW_EXTERNAL_LINKS,
  LOAD_SHOW_RECOMMENDATIONS,
  LOAD_SIMILAR_SHOWS,
  SEASON_URL,
  SHOW_URL,
} from './constants';

export default class ShowService extends Service {
  private async fetchFullDetailedSeason(seasonNumber: number, tvId: number): Promise<Season> {
    const lang = this.translator.language;
    const season = await this.fetcher.get(SEASON_URL(tvId, seasonNumber, lang));
    return season.data;
  }

  async fetchById(id: number): Promise<TvShow> {
    const lang = this.translator.language;
    const fullShowDetails: TvShow = await (await this.fetcher.get(SHOW_URL(id, lang))).data;
    const imdbId = await (await this.fetcher.get(LOAD_SHOW_EXTERNAL_LINKS(id))).data.imdb_id;
    const fullDetailedSeasonsResponse: Promise<Season>[] = fullShowDetails.seasons.map((season) =>
      this.fetchFullDetailedSeason(season.season_number, fullShowDetails.id),
    );
    const fullDetailedSeasons = await Promise.all(fullDetailedSeasonsResponse);
    return { ...fullShowDetails, imdb_id: imdbId, seasons: fullDetailedSeasons };
  }

  private async fetchShows(path: string, page = 1): Promise<TvShow[]> {
    const language = this.translator.language;
    const response = await this.fetcher.get(this.buildUrl(path), {
      params: { language, page },
    });
    return response.data;
  }

  async fetchFullDetailed(content: TvShow[]): Promise<TvShow[]> {
    const fullDetailedMoviesResponse = Promise.all(content.map((show) => this.fetchById(show.id)));
    const fullDetailedShows = await fullDetailedMoviesResponse;

    return fullDetailedShows;
  }

  async fetchTopRated(): Promise<TvShow[]> {
    return this.fetchShows('shows/top-rated');
  }

  async fetchPopular(): Promise<TvShow[]> {
    return this.fetchShows('shows/popular');
  }

  async fetchTrending(): Promise<TvShow[]> {
    return this.fetchShows('trending/shows');
  }

  async fetchRecommendations(id: number): Promise<TvShow[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(LOAD_SHOW_RECOMMENDATIONS(id, lang));
    const fullDetailedShows = await this.fetchFullDetailed(response.data.results);
    return fullDetailedShows;
  }

  async fetchSimilar(id: number): Promise<TvShow[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(LOAD_SIMILAR_SHOWS(id, lang));
    const fullDetailedShows = await this.fetchFullDetailed(response.data.results);
    return fullDetailedShows;
  }
}
