import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
  AnimationEvent
} from '@angular/animations';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
  ContentChildren,
  Renderer2,
  AfterViewChecked
} from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ResizeInfo, ResizeService } from '../shared/services/resize.service';

@Component({
  selector: 'app-row-wrapp',
  templateUrl: './row-wrapp.component.html',
  styleUrls: ['./row-wrapp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('showBlock', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('0.3s 300ms', style({
          opacity: 1,
        }))
      ]),
      transition(':leave', [
        animate('0.3s', style({
          opacity: 0,
        }))
      ]),
    ])
  ]
})
export class RowWrappComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() title: string;
  @Input() showMoreButtonLink: string;
  @Input() isPreview = false;
  @Input() data: any[];

  innerHeight: string = 'auto';
  cardWidth: number = null;

  resizeSubsribtion$: Subscription;
  numberOfFitElements = 0;

  @ContentChildren(MovieCardComponent) childrens: any;

  constructor(
    private resize: ResizeService,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) { }

  ngAfterViewChecked(): void {
    const card = this.elementRef.nativeElement.querySelector('.height-wrapper > .inner > *:first-child') as HTMLElement;

    if (!card) return;
    
    const cardHeight = card.getBoundingClientRect().height;
    const cardWidth = card.getBoundingClientRect().width;
    
    if (this.cardWidth !== cardWidth) {
      this.cardWidth = cardWidth;
      this.updatePlaceholders(
        this.countElements(
          this.elementRef.nativeElement.offsetWidth
        )
      );
    }

    if (cardHeight === 0 || this.innerHeight === cardHeight + 'px') return;
    
    this.innerHeight = cardHeight + 'px';
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.resizeSubsribtion$ = this.resize.getResize(this.elementRef)
      .pipe(
        map(({ width }: ResizeInfo) => this.countElements(width)),
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
    const cardW = this.cardWidth ? (this.cardWidth + 20 ): (250 + 20);
    return Math.floor(width / cardW);
  }

  private updatePlaceholders(counts: number) {
    this.numberOfFitElements = counts;
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.resizeSubsribtion$.unsubscribe();
  }

  showEnd({ element}: AnimationEvent) {
    setTimeout(() => {
      element.closest('.wrapper').scrollTo(0, 0);
    }, 0);
  }

}
