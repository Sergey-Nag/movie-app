import { NgModule } from "@angular/core";
import { RepeatPipe } from "../pipes/repeat.pipe";
import { UiKitModule } from "./ui-kit/ui-kit.module";

@NgModule({
  declarations: [
    RepeatPipe,
  ],
  imports: [
    UiKitModule,
  ],
  exports: [
    UiKitModule,
    RepeatPipe,
  ]
})
export class SharedModule { }