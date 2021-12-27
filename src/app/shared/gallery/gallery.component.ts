import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, HostBinding, ChangeDetectorRef } from '@angular/core';
import { TMDBService } from 'src/app/core/services/tmdb.service';
import { TMDBPosterSize } from 'src/app/core/types/tmdb.types';
import { GalleryService, ModalImagesState, ModalState } from './gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('backdrop', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0,
      })),
      transition('hide => show', [
        animate('0.4s ease-out')
      ])
    ]),
  ]
})
export class GalleryComponent implements OnInit {
  open = false;
  activeImageIndex: number;
  isGallery = false;
  images: ModalImagesState;
  
  prevIndex = 0;

  private activeImagePath:string;
  
  @HostBinding('style.display') get display() {
    return this.open ? 'block' : 'none';
  }

  get imageUrl() {
    return this.tmdb.getImagePath(this.images[this.activeImageIndex], TMDBPosterSize.original);
  }

  getImagePath(i: number) {
    return this.activeImagePath ?? this.tmdb.getImagePath(this.images[i], TMDBPosterSize.original);
  }

  constructor(private gallery: GalleryService, private cdRef: ChangeDetectorRef, private tmdb: TMDBService) { }

  chooseImage(target: EventTarget) {
    const element = target as HTMLElement;
    if (!element.classList.contains('cover-min')) return;
    
    this.activeImageIndex = +element.dataset.index;
    element.scrollIntoView({
      block: 'nearest', behavior: 'smooth', inline: 'center'
    });
  }

  ngOnInit(): void {
    this.gallery.state.subscribe((state: ModalState) => {
      console.log(state);
      
      this.open = state.open;
      this.activeImageIndex = state.activeImageIndex;
      this.isGallery = state.isGallery;

      this.cdRef.detectChanges();
    });

    this.gallery.images.subscribe((images: ModalImagesState) => {
      this.images = images
      this.cdRef.detectChanges();
    });
  }

}
