import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BackgroundImageService } from './core/services/background-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':leave', [
        animate('0.5s ease', style({
          opacity: 0,
        }))
      ]),
    ])
  ]
})
export class AppComponent implements OnInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private bgImage: BackgroundImageService,
  ) {}

  _bgUrl:string = null;
  get bgImageSrc() {
    return this._bgUrl;
  }

  set bgImageSrc(value: string) {
    this._bgUrl = value;
    if (!value) this.bgLoaded = false;
  }

  bgLoaded = false;

  ngOnInit(): void {
    this.bgImage.imageUrl.subscribe((imageUrl) => {      
      this.bgImageSrc = imageUrl;
      this.cdRef.detectChanges();
    });
  }

}
