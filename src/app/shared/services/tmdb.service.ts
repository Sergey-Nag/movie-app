import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MovieData } from "src/app/movie-card/movie.type";
import { MovieComingData } from "src/app/movie-coming-card/movie-coming.interface";
import { environment } from "src/environments/environment";
import { GenreResponse, TMDBConfig, TMDBPosterSize } from "./tmdb.types";


@Injectable({
  providedIn: 'root'
})
export class TMDBService {
  private apiKey: string = environment.tmdbApiKEy;
  config: TMDBConfig;
  private apiUrl = 'https://api.themoviedb.org/3';

  popular: MovieData[];

  constructor(private http: HttpClient) {
  }

  setConfig() {
    this.http.get(`${this.apiUrl}/configuration?api_key=${this.apiKey}`)
      .subscribe((config: TMDBConfig) => this.config = config);
  }

  getPopular(): Observable<any> {    
    return this.get('/movie/popular')
      .pipe(map((data: any) => {
        return {
          ...data,
          results: this.formatResultsToMovieData(data.results)
        }
      }))
  }

  getImage(path: string, size: TMDBPosterSize = TMDBPosterSize.original) {
    const { images } = this.config;
    return this.http.get(
      images.base_url +
      images.poster_sizes[size] +
      path
    )
  }

  getGenres(): Observable<GenreResponse[]> {
    return this.get('/genre/movie/list');
  }

  getUpcoming(): Observable<GenreResponse[]> {
    return this.get('/movie/upcoming')
      .pipe(map((data: any) => ({
        ...data,
        results: this.formatResultsToComingMovieData(data.results)
      })));
  }

  private formatResultsToMovieData(results: any[]): MovieData[] {
    return results.map(({original_title, poster_path, vote_average, adult}: any) => ({
      title: original_title,
      coverUrl: poster_path,
      duration: vote_average,
      pg: adult ? '18+' : 'p',
    }));
  }

  private formatResultsToComingMovieData(results: any[]): MovieComingData[] {
    return this.formatResultsToMovieData(results).map((el, i) => ({
      ...el,
      comingDate: results[i].release_date
    }))
  }

  private get(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}?api_key=${this.apiKey}`)
  }
}