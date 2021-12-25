import { NgModule } from "@angular/core";
import { RepeatPipe } from "../pipes/repeat.pipe";
import { SliceArrayPipe } from "../pipes/slice.pipe";
import { UiKitModule } from "./ui-kit/ui-kit.module";

@NgModule({
  declarations: [
    RepeatPipe,
    SliceArrayPipe,
  ],
  imports: [
    UiKitModule,
  ],
  exports: [
    UiKitModule,
    RepeatPipe,
    SliceArrayPipe,
  ]
})
export class SharedModule { }