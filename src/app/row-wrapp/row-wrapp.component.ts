import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ChangeDetectionStrategy, Input, AfterViewInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ResizeInfo, ResizeService } from '../shared/services/resize.service';

@Component({
  selector: 'app-row-wrapp',
  templateUrl: './row-wrapp.component.html',
  styleUrls: ['./row-wrapp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cardShow', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(200, style({
          opacity: 1,
        }))
      ]),
      transition('* => void', [
        style({
          opacity: 1,
        }),
        animate(200, style({
          opacity: 0,
        }))
      ]),
    ])
  ]
})
export class RowWrappComponent implements AfterViewInit, OnDestroy {
  @Input() title: string;
  @Input() isLoading = true;
  @Input() showMoreButtonLink: string;

  resizeSubsribtion$: Subscription;
  numberOfFitElements = 0;

  constructor(
    private resize: ResizeService,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }
  
  ngAfterViewInit(): void {
    this.resizeSubsribtion$ = this.resize.getResize(this.elementRef)
      .pipe(
        map(({width}: ResizeInfo) => this.countElements(width)),
        distinctUntilChanged(),
      )
      .subscribe(this.updatePlaceholders.bind(this));
    
    this.updatePlaceholders(
      this.countElements(
        this.elementRef.nativeElement.offsetWidth
      )
    );

    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1500);
  }

  private countElements(width: number): number {
    const cardWidth = 250 + 20;
    return Math.floor(width / cardWidth);
  }

  private updatePlaceholders(counts: number) {
    this.numberOfFitElements = counts;
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.resizeSubsribtion$.unsubscribe();
  }

}
