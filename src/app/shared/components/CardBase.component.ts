import { Component, Input } from "@angular/core";
import { trigger, transition, style, animate, state } from "@angular/animations";

@Component({
  template: '',
  animations: [
    trigger('showBlock', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('0.5s 520ms', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('0.5s', style({
          opacity: 0
        }))
      ]),
    ])
  ]
})
export class CardBaseComponent {
  @Input() isPreview: boolean = false;
}