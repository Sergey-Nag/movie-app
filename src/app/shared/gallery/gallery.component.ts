import { animate, AnimationEvent, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, HostBinding, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
      transition('hide <=> show', [
        animate('0.4s ease-out')
      ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1}),
        animate(200, style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class GalleryComponent implements OnInit {
  open = false;
  backdropState: 'show' | 'hide' = 'hide';
  activeImageIndex: number;
  isGallery = false;
  images: ModalImagesState;
  
  prevIndex = 0;
  
  @HostBinding('style.display') get display() {
    return this.open ? 'block' : 'none';
  }

  get imageUrl() {
    return this.tmdb.getImagePath(this.images[this.activeImageIndex], TMDBPosterSize.original);
  }

  getImagePath(i: number) {
    return this.tmdb.getImagePath(this.images[i], TMDBPosterSize.original);
  }
  @ViewChild('scroll') scrollWrapp: ElementRef;

  constructor(private gallery: GalleryService, private cdRef: ChangeDetectorRef, private tmdb: TMDBService) { }

  chooseImage(target: EventTarget) {
    const element = target as HTMLElement;
    if (!element.classList.contains('cover-min')) return;
    
    this.activeImageIndex = +element.dataset.index;
    this.scrollWrapp.nativeElement.style.willChange = 'scroll-position';
    
    element.scrollIntoView({
      block: 'nearest', behavior: 'smooth', inline: 'center'
    });
    
    setTimeout(() => {
      this.scrollWrapp.nativeElement.style.willChange = 'unset';
    }, 200);
  }

  closeGallery(target: EventTarget) {
    const element = target as HTMLElement;
    if (!element.classList.contains('backdrop')) return;

    this.gallery.close();
    this.backdropState = 'hide';
  }

  onBackdropEnd({ toState }: AnimationEvent) {
    if (toState === 'hide') {
      this.open = false;
    }
  }

  ngOnInit(): void {
    this.gallery.state.subscribe((state: ModalState) => {
      console.log(state);
      
      if (state.open) {
        this.open = state.open;
        this.backdropState = 'show';
      } else {
        this.backdropState = 'hide';
      }
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
