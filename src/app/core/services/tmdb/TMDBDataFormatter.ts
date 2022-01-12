import { Injectable } from "@angular/core";
import { MovieData } from "src/app/shared/components/movie-card/movie.type";
import { MovieComingData } from "src/app/shared/components/movie-coming-card/movie-coming.interface";
import { TMDBResponseFormatter } from "../../interfaces/tmdb-response-formatter.interface";

export class TMDBDataFormatter implements TMDBResponseFormatter {
  formatResultsToComingMovieData(results: any[]): MovieComingData[] {
    return this.formatResultsToMovieData(results).map((el, i) => ({
      ...el,
      comingDate: results[i].release_date
    }))
  }

  formatResultsToMovieData(results: any[]): MovieData[] {
    return results.map(({id, genre_ids, title, poster_path, vote_average, adult}: any) => ({
      id,
      gengres: genre_ids,
      title: title,
      coverUrl: poster_path,
      duration: vote_average,
      pg: adult ? '18+' : 'p',
    }));
  }

}