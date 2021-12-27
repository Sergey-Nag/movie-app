import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryDirective } from './gallery.directive';
import { GalleryComponent } from './gallery.component';

@NgModule({
  declarations: [
    GalleryDirective,
    GalleryComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GalleryDirective,
    GalleryComponent,
  ],
})
export class GalleryModule { }
