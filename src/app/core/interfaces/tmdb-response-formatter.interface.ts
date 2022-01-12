import { MovieData } from "src/app/shared/components/movie-card/movie.type";
import { MovieComingData } from "src/app/shared/components/movie-coming-card/movie-coming.interface";

export interface TMDBResponseFormatter {
  formatResultsToComingMovieData(results: any[]): MovieComingData[];
  formatResultsToMovieData(results: any[]): MovieData[];
}