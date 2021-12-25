import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ChangeDetectionStrategy, Input, AfterViewInit, ElementRef, OnDestroy, ChangeDetectorRef, ContentChild, TemplateRef, ContentChildren, ViewChildren, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CardBaseComponent } from '../shared/components/CardBase.component';
import { ResizeInfo, ResizeService } from '../shared/services/resize.service';

@Component({
  selector: 'app-row-wrapp',
  templateUrl: './row-wrapp.component.html',
  styleUrls: ['./row-wrapp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true }),
      ])
    ])
  ]
})
export class RowWrappComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  @Input() title: string;
  @Input() showMoreButtonLink: string;
  @Input() isPreview = false;
  @Input() data: any[];

  resizeSubsribtion$: Subscription;
  numberOfFitElements = 0;

  @ContentChild('elRef') childrens: any;

  constructor(
    private resize: ResizeService,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }

  ngAfterContentInit(): void {
    console.log(this.childrens);
  }
  
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
