import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ButtonComponent } from "./button/button.component";
import { SwitchComponent } from "./switch/switch.component";
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoaderComponent } from './loader/loader.component';
import { CommonModule } from "@angular/common";

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
  ],
  exports: [
    SwitchComponent,
    ButtonComponent,
    InputComponent,
    IconComponent,
    AngularSvgIconModule
  ],
})
export class UiKitModule {}
