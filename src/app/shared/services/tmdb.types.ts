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