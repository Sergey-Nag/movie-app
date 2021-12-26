import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BackgroundImageService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  public imageUrl: BehaviorSubject<string> = new BehaviorSubject(null);

  setImage(imageUrl: string) {
    this.imageUrl.next(imageUrl);
  }

  removeImage() {
    this.imageUrl.next(null);
  }
}