import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type ModalState = {
  open: boolean;
  activeImageIndex: number | null;
  isGallery: boolean,
}
export type ModalImagesState = string[] | null;

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private imagesState: ModalImagesState;
  private modalState: ModalState = {
    open: false,
    activeImageIndex: null,
    isGallery: false,
  }

  images: Subject<ModalImagesState> = new Subject();
  state: Subject<ModalState> = new Subject();
 
  constructor() { }

  open(index: number = 0) {
    this.modalState.open = true;
    this.modalState.activeImageIndex = this.imagesState?.length ? index : null;
    
    this.pushModalChanges();
  }

  close() {
    this.modalState.open = false;
    this.modalState.activeImageIndex = null;
    this.modalState.isGallery = false;

    this.pushModalChanges();
  }

  setImages(images: string[]) {
    this.imagesState = images;

    this.pushImagesChanges();
  }

  private pushModalChanges() {
    this.state.next(this.modalState);
  }
  
  private pushImagesChanges() {
    this.images.next(this.imagesState);
  }
}
