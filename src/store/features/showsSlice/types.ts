import { Actor, Genre, ProdcutionCompany, Video } from '../moviesSlice/types';

interface ShowCreator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  still_path: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_parh: string;
  episodes: Episode[];
  season_number: number;
}

export interface TvShow {
  backdrop_path: string;
  created_by: ShowCreator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  name: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  overview: string;
  poster_path: string;
  production_companies: ProdcutionCompany[];
  seasons: Season[];
  media_type?: string;
  vote_average: number;
  trailer: Video | undefined;
  cast: Actor[];
}
