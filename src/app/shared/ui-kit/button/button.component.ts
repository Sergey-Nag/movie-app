import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";


@Component({
  selector: 'ui-btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() linkTo: string[] = null;
  @Input() size: string = null;
  @Input() style: 'transparent' | 'gradient' | 'fill' = null;
  @Input() icon: string;
  @Input() width: 'full' | null = null;

  active: boolean = false;

  @HostBinding('class.full') get containerWidth() {
    return this.width === 'full';
  }
  constructor() {}

}