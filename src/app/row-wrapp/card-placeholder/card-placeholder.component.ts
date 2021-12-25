import { Component, OnInit, ChangeDetectionStrategy, Input, Renderer2, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-placeholder',
  templateUrl: './card-placeholder.component.html',
  styleUrls: ['./card-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPlaceholderComponent implements AfterViewInit {
  @Input() type: string = null;
  @ViewChild('container') container: ElementRef;

  constructor(private render: Renderer2, private element: ElementRef ) { }

  ngAfterViewInit(): void {
    const className = this.type.toLowerCase().replace(/ /g, '-');
    this.render.addClass(this.element.nativeElement, className);
  }

}
