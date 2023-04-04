import { Season, TvShow } from '../../types/types';
import ContentService from '../types/ContentService';
import {
  LOAD_SHOW_EXTERNAL_LINKS,
  LOAD_SHOW_RECOMMENDATIONS,
  LOAD_SIMILAR_SHOWS,
  POPULAR_SHOWS_URL,
  SEASON_URL,
  SHOW_URL,
  TOP_RATED_SHOWS_URL,
  TRENDING_SHOWS_URL,
} from './constants';

export default class ShowService extends ContentService<TvShow> {
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

  async fetchFullDetailed(content: TvShow[]): Promise<TvShow[]> {
    const fullDetailedMoviesResponse = Promise.all(content.map((show) => this.fetchById(show.id)));
    const fullDetailedShows = await fullDetailedMoviesResponse;

    return fullDetailedShows;
  }

  async fetchTopRated(): Promise<TvShow[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(TOP_RATED_SHOWS_URL(lang));
    const fullDetailedShows = await this.fetchFullDetailed(response.data.results);
    return fullDetailedShows;
  }

  async fetchPopular(): Promise<TvShow[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(POPULAR_SHOWS_URL(lang));
    const fullDetailedShows = await this.fetchFullDetailed(response.data.results);
    return fullDetailedShows;
  }

  async fetchTrending(): Promise<TvShow[]> {
    const lang = this.translator.language;
    const response = await this.fetcher.get(TRENDING_SHOWS_URL(lang));
    const fullDetailedShows = await this.fetchFullDetailed(response.data.results);
    return fullDetailedShows;
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
