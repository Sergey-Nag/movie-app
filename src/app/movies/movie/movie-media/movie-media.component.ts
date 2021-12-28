import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, OnDestroy, Output } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, filter, map, mapTo } from 'rxjs/operators';
import { TMDBService } from 'src/app/core/services/tmdb.service';
import { TMDBPosterSize } from 'src/app/core/types/tmdb.types';

@Component({
  selector: 'app-movie-media',
  templateUrl: './movie-media.component.html',
  styleUrls: ['./movie-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieMediaComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() id: number;

  images: string[];
  activatedImageIndex: number = null;
  galleryShow = false;

  @ViewChild('cover') cover: ElementRef;

  constructor(private tmdb: TMDBService, private cdRef: ChangeDetectorRef) { }

  getImagePath(index: number) {
    return this.tmdb.getImagePath(this.images[index], TMDBPosterSize.original);
  }

  chooseImage(e: Event) {
    const element = e.target as HTMLElement;
    if (!element.classList.contains('cover-min')) return;
    
    const index = +element.dataset.index;
    this.activatedImageIndex = index;
    this.cover.nativeElement.style.willChange = 'background';

    element.scrollIntoView({
      block: 'nearest', behavior: 'smooth', inline: 'center'
    });
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.cover.nativeElement.style.willChange = 'unset';
    }, 200);
  }

  ngOnInit(): void {
    this.tmdb.getMovieImages(this.id)
      .pipe(
        map((data) => {
          console.log(data);

          return [
            ...data.backdrops.map(el=> el.file_path),
            ]
        })
      )
      .subscribe((data) => {
        this.images = data;
        this.activatedImageIndex = 0;
        
        this.cdRef.detectChanges();
      })
  }


  galleryHoverSubscription: Subscription;
  ngAfterViewInit(): void {
    let mouseInside = false;

    const mouseEnter$ = fromEvent(this.cover.nativeElement, 'mouseenter')
      .pipe(map(() => mouseInside = true), mapTo(true));

    const mouseLeave$ = fromEvent(this.cover.nativeElement, 'mouseleave')
      .pipe(map(() => mouseInside = false), debounceTime(2000), mapTo(false));

    this.galleryHoverSubscription = merge(mouseEnter$, mouseLeave$)
      .pipe(filter((el) => el === mouseInside))
      .subscribe((data) => {
        this.galleryShow = data;
        this.cdRef.detectChanges();
      })
  }

  ngOnDestroy(): void {
    this.galleryHoverSubscription.unsubscribe();
  }

}
