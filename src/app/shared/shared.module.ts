import { NgModule } from "@angular/core";
import { MapPipe } from "./pipes/map.pipe";
import { RepeatPipe } from "./pipes/repeat.pipe";
import { SliceArrayPipe } from "./pipes/slice.pipe";
import { UiKitModule } from "./ui-kit/ui-kit.module";
import { JoinPipe } from './pipes/join.pipe';
import { GalleryModule } from "./gallery/gallery.module";
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieCategoryCardComponent } from './components/movie-category-card/movie-category-card.component';
import { MovieComingCardComponent } from './components/movie-coming-card/movie-coming-card.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    RepeatPipe,
    SliceArrayPipe,
    MapPipe,
    JoinPipe,
    MovieCardComponent,
    MovieCategoryCardComponent,
    MovieComingCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiKitModule,
    GalleryModule,
  ],
  exports: [
    RepeatPipe,
    GalleryModule,
    SliceArrayPipe,
    MapPipe,
    JoinPipe,
    UiKitModule,
    MovieCardComponent,
    MovieCategoryCardComponent,
    MovieComingCardComponent,
  ]
})
export class SharedModule { }