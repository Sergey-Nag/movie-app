import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { combineLatest, concat, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { combineAll, debounce, debounceTime, delay, filter, map, mapTo, repeat, sample, skipUntil, takeLast, takeUntil, takeWhile } from 'rxjs/operators';
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
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.tmdb.getMovieImages(this.id)
      .pipe(
        map((data) => {
          return [
            ...data.backdrops.map(el=> el.file_path),
            ...data.posters.map(el=> el.file_path)
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