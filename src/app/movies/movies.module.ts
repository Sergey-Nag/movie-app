import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesRoutingComponent } from './movies-routing.component';



@NgModule({
  declarations: [
    MoviesComponent,
    MovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingComponent,
  ]
})
export class MoviesModule { }
