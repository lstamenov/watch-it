export interface Movie {
  release_date: string;
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  budget: number;
  revenue: number;
  imdb_id: string;
  production_companies: ProdcutionCompany[];
  vote_count: number;
  original_language: string;
  original_title: string;
  poster_path: string;
  video: boolean;
  id: number;
  vote_average: number;
  title: string;
  overview: string;
  popularity: number;
  media_type: string;
  runtime: number;
  trailer: Video | undefined;
  cast: Actor[];
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ProdcutionCompany {
  id: number;
  logo_path: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}
