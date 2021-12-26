export type TMDBResult = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
}

export type TMDBConfig = {
  images: {
    base_url: string,
    secure_base_url: string,
    backdrop_sizes: string[],
    logo_sizes: string[],
    poster_sizes: string[],
    profile_sizes: string[],
    still_sizes: string[],
  },
  change_keys: string[]
}

export type GenreResponse = {
  id: number,
  name: string
}

export enum TMDBPosterSize {
  w92,
  w154,
  w185,
  w342,
  w500,
  w780,
  original
}

export type MovieDetails = {
  adult: boolean,
  backdrop_path: string | null,
  belongs_to_collection: {
    backdrop_path: string,
    id: number,
    name: string,
    poster_path: string
  }[],
  budget: number,
  genres: {
    id: number,
    name: string,
  }[],
  homepage: string | null,
  id: number
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string | null,
  popularity: number,
  poster_path: string | null,
  production_companies: {
    id: number,
    logo_path: string | null,
    name: string,
    origin_country: string,
  }[]
  production_countries: {
    iso_3166_1: string,
    name: string,
  }[]
  release_date: string,
  revenue: number,
  runtime: number | null,
  spoken_languages: {
    english_name: string,
    iso_639_1: string,
    name: string,
  }[],
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post' | 'Production' | 'Released' | 'Canceled',
  tagline: string | null,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}