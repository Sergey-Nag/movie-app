import { Component, Input } from "@angular/core";

@Component({
  template: '',
})
export class CardBase {
  @Input() isPreview: boolean = false;
}