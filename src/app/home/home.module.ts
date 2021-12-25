import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RowWrappComponent } from '../row-wrapp/row-wrapp.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieCategoryCardComponent } from '../movie-category-card/movie-category-card.component';
import { MovieComingCardComponent } from '../movie-coming-card/movie-coming-card.component';
import { SharedModule } from '../shared/shared.module';
import { CardPlaceholderComponent} from '../row-wrapp/card-placeholder/card-placeholder.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    RowWrappComponent,
    CardPlaceholderComponent,
    MovieCardComponent,
    MovieCategoryCardComponent,
    MovieComingCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ],
  exports: [
    HomeRoutingModule,
    HomeComponent,
    RowWrappComponent,
    CardPlaceholderComponent,
    MovieCardComponent,
    MovieCategoryCardComponent,
    MovieComingCardComponent,
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
