import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, mapTo, switchMap, take } from "rxjs/operators";
import { MovieData } from "src/app/shared/components/movie-card/movie.type";
import { MovieComingData } from "src/app/shared/components/movie-coming-card/movie-coming.interface";
import { environment } from "src/environments/environment";
import { CastDetails, GenreResponse, MovieDetails, MovieImages, MovieVideos, TMDBConfig, TMDBPosterSize } from "../types/tmdb.types";


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

  getConfig() {
    return this.http.get(`${this.apiUrl}/configuration?api_key=${this.apiKey}`).pipe(map((config: TMDBConfig) => this.config = config));
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
      }));
  }

  getImagePath(path: string, size: TMDBPosterSize = TMDBPosterSize.w342): string {
    if (!path) return '';
    if (path[0] !== '/') path = `/${path}`;

    return `${this.config.images.secure_base_url}${this.config.images.poster_sizes[size]}${path}`;
  }

  getBackdropPath(path: string, size: TMDBPosterSize = TMDBPosterSize.w342): Observable<string> {
    if (this.config) {
      return of(`${this.config.images.secure_base_url}${this.config.images.poster_sizes[size]}${path}`).pipe(take(1));
    }

    return this.getConfig().pipe(
      switchMap(() => of(`${this.config.images.secure_base_url}${this.config.images.poster_sizes[size]}${path}`)),
      take(1),
      )
  }

  getGenres(): Observable<GenreResponse[]> {
    return this.get('/genre/movie/list').pipe(map((resp: any) => resp.genres));
  }

  getUpcoming(): Observable<GenreResponse[]> {
    return this.get('/movie/upcoming')
      .pipe(map((data: any) => ({
        ...data,
        results: this.formatResultsToComingMovieData(data.results)
      })));
  }

  getMovie(movie_id: number): Observable<MovieDetails> {
    return this.get(`/movie/${movie_id}`);
  }

  getDiscoverMovieBy(query: {[key: string]: string | number}): Observable<any> {
    const queryParams = Object.keys(query).map((key) => {
      return `${key}=${query[key]}`;
    }).join('&');
    return this.get(`/discover/movie`, queryParams).pipe(map((data) => {
      return {
        ...data,
        results: this.formatResultsToMovieData(data.results)
      }
    }));
  }

  getMovieCredits(movie_id: number): Observable<CastDetails> {
    return this.get(`/movie/${movie_id}/credits`);
  }

  getMovieImages(movie_id: number): Observable<MovieImages> {
    return this.get(`/movie/${movie_id}/images`);
  }

  getMovieVideos(movie_id: number): Observable<MovieVideos> {
    return this.get(`/movie/${movie_id}/videos`);
  }

  private formatResultsToMovieData(results: any[]): MovieData[] {
    return results.map(({id, genre_ids, title, poster_path, vote_average, adult}: any) => ({
      id,
      gengres: genre_ids,
      title: title,
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

  private get(path: string, params?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}?api_key=${this.apiKey}${params ? `&${params}` : ''}`)
  }
}