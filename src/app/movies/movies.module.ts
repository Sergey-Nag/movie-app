import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesRoutingComponent } from './movies-routing.component';
import { SharedModule } from '../shared/shared.module';
import { MovieRatingComponent } from './movie/movie-rating/movie-rating.component';
import { MovieCastComponent } from './movie/movie-cast/movie-cast.component';
import { MovieListCollapsedComponent } from './movie/movie-list-collapsed/movie-list-collapsed.component';
import { MovieMediaComponent } from './movie/movie-media/movie-media.component';



@NgModule({
  declarations: [
    MoviesComponent,
    MovieComponent,
    MovieRatingComponent,
    MovieCastComponent,
    MovieListCollapsedComponent,
    MovieMediaComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingComponent,
    SharedModule,
  ]
})
export class MoviesModule { }
