import { ChangeDetectionStrategy, Component, Input } from "@angular/core";


@Component({
  selector: 'ui-btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() linkTo: string[] = null;
  @Input() size: string = null;
  @Input() style: string = null;
  @Input() icon: string;
  active: boolean = false;

  constructor() {}

}