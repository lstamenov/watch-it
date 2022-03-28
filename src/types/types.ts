export interface Movie {
  release_date: string,
  adult: boolean,
  backdrop_path: string,
  genres: Genre[],
  budget: number,
  revenue: number,
  imdb_id: string,
  production_companies: ProdcutionCompany[],	
  vote_count:	number,
  original_language: string,
  original_title: string,
  poster_path: string,
  video: boolean,
  id: number,
  vote_average: number,
  title: string,
  overview: string,
  popularity: number
  media_type: string,
  runtime: number,
}

export interface TrendingMovie {
  release_date: string,
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  genres: Genre[],
  original_language: string,
  original_title: string,
  poster_path: string,
  video: boolean,
  id: number,
  title: string,
  overview: string,
  popularity: number
  media_type: string,
  vote_average: number,
}

export interface ProdcutionCompany {
  id: number,
  logo_path: string,
  name: string,
}

export interface Genre {
  id: number,
  name: string,
}

export interface ShowCreator {
  id: number,
  credit_id: string,
  name: string,
  gender: number,
  profile_path: string,
}

export interface Network {
  name: string,
  id: number,
  logo_path: string,
  origin_country: string,
}

export interface Episode {
  air_date: string,
  episode_number: number,
  id: number,
  name: string,
  overview: string,
  still_path: string,
}

export interface Season {
  air_date: string,
  episode_count: number,
  id: number,
  name: string,
  overview: string,
  poster_parh: string,
  episodes: Episode[],
  season_number: number,
}

export interface TvShow {
  backdrop_path: string,
  created_by: ShowCreator[],
  episode_run_time: number[],
  first_air_date: string,
  genres: Genre[],
  homepage: string,
  id: number,
  imdb_id: string,
  name: string,
  networks: Network[],
  number_of_episodes: number,
  number_of_seasons: number,
  origin_country: string[],
  original_language: string,
  overview: string,
  poster_path: string,
  production_companies: ProdcutionCompany[],
  seasons: Season[],
  media_type?: string,
}

export interface TrendingShow {
  backdrop_path: string,
  first_air_date: string,
  genres: Genre[],
  id: number,
  name: string,
  origin_country: string[],
  original_language: string,
  overview: string,
  poster_path: string,
  media_type: string,
  vote_average?: number,
  genre_ids?: number[],
}