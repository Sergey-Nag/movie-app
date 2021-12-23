import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MovieData } from "src/app/movie-card/movie.type";
import { environment } from "src/environments/environment";
import { TMDBConfig, TMDBPosterSize } from "./tmdb.types";


@Injectable({
  providedIn: 'root'
})
export class TMDBService {
  private apiKey: string = environment.tmdbApiKEy;
  config: TMDBConfig;
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {
  }

  setConfig() {
    this.http.get(`${this.apiUrl}/configuration?api_key=${this.apiKey}`)
      .subscribe((config: TMDBConfig) => this.config = config);
  }

  getPopular() {
    console.log(this.config);
    
    return this.get('/discover/movie')
      .pipe(map((data: any) => {
        return {
          ...data,
          results: this.formatResults(data.results)
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

  private formatResults(results: any[]): MovieData[] {
    return results.map(({original_title, poster_path, vote_average, adult}: any) => ({
      title: original_title,
      coverUrl: poster_path,
      duration: vote_average,
      pg: adult ? '18+' : 'p',
    })).splice(10);
  }

  private get(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}?api_key=${this.apiKey}`)
  }
}