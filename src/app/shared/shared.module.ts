import { NgModule } from "@angular/core";
import { MapPipe } from "./pipes/map.pipe";
import { RepeatPipe } from "./pipes/repeat.pipe";
import { SliceArrayPipe } from "./pipes/slice.pipe";
import { UiKitModule } from "./ui-kit/ui-kit.module";
import { JoinPipe } from './pipes/join.pipe';
import { GalleryModule } from "./gallery/gallery.module";

@NgModule({
  declarations: [
    RepeatPipe,
    SliceArrayPipe,
    MapPipe,
    JoinPipe,
  ],
  imports: [
    UiKitModule,
    GalleryModule,
  ],
  exports: [
    UiKitModule,
    GalleryModule,
    RepeatPipe,
    SliceArrayPipe,
    MapPipe,
    JoinPipe,
  ]
})
export class SharedModule { }