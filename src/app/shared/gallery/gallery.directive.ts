import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { GalleryService } from './gallery.service';

@Directive({
  selector: '[appGallery]'
})
export class GalleryDirective {
  @Input('appGallery.images') images: string[];
  @Input('appGallery.selectedIndex') selectedIndex: number;


  @HostBinding('style.cursor') get cursor() {
    return 'pointer';
  }

  @HostBinding('class.open-gallery') get openGalleryClass() {
    return true;
  }

  @HostListener('click', ['$event.target']) modalShow(target: HTMLElement) {
    if (!target.classList.contains('open-gallery')) return;
    
    this.gallery.setImages(this.images);
    this.gallery.open(this.selectedIndex);
  }

  constructor(private gallery: GalleryService) { }
}
