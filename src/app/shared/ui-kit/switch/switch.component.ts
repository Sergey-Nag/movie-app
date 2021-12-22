import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'ui-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent {
  @Input() atRight: boolean;
  @Output() change = new EventEmitter<boolean>();
  @Input() firstLabel: string;
  @Input() secondLabel: string;

  setVal(value: boolean) {
    this.atRight = value;
    this.change.emit(this.atRight);
  }

  switchValue() {
    this.setVal(!this.atRight);
  }
}
