import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonComponent } from "./button/button.component";
import { SwitchComponent } from "./switch/switch.component";
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoaderComponent } from './loader/loader.component';
import { CommonModule } from "@angular/common";
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule.forRoot()
  ],
  declarations: [
    SwitchComponent,
    ButtonComponent,
    IconComponent,
    InputComponent,
    LoaderComponent,
    PaginationComponent,
  ],
  exports: [
    SwitchComponent,
    ButtonComponent,
    InputComponent,
    IconComponent,
    AngularSvgIconModule,
    PaginationComponent,
  ],
})
export class UiKitModule {}
