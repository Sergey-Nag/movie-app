import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MovieData } from '../shared/components/movie-card/movie.type';
import { CategodyData } from '../shared/components/movie-category-card/category.type';
import { MovieComingData } from '../shared/components/movie-coming-card/movie-coming.interface';
import { TMDBService } from '../core/services/tmdb.service';
import { concatAll, concatMap, map, mergeAll, switchMap } from 'rxjs/operators';
import { GenreResponse, MovieDetails } from '../core/types/tmdb.types';
import { DatabaseService } from '../firebase/database.service';
import { combineLatest, concat, merge } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  movies: MovieData[] = [];
  comingMovies: MovieComingData[] = []
  categories: CategodyData[] = [];

  constructor(private cdRef: ChangeDetectorRef, private tmdb: TMDBService, private db: DatabaseService) { }
  
  ngOnInit(): void {
    this.tmdb.getPopular()
      .subscribe((data)=> {
        this.movies = data.results;
        this.cdRef.detectChanges();
      });

      combineLatest([this.tmdb.getGenres(), this.db.getCategoryBackdrop()])
        .pipe(map(([genres, backdrops]: [GenreResponse[], any]) => {
          return genres.map((genre) => ({
            ...genre,
            coverUrl: backdrops[genre.id] ? this.tmdb.getImagePath(backdrops[genre.id]) : ''
          }))
        }))
        .subscribe((data: CategodyData[])=> {
          console.log(data);
          
          this.categories = data;
          this.cdRef.detectChanges();
      });

    this.tmdb.getUpcoming()
      .subscribe(({results}: any) => {
        this.comingMovies = results;
        this.cdRef.detectChanges();
      })
  }

}
