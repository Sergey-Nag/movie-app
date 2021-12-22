import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsLoader } from './icon.model';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  icons: IconsLoader;
  @Input() name: string;
  @Input() iconStyle: 'outline' | 'fill' = 'outline';
  color: string = 'white';

  @Input() btnIcon: boolean = false;
  @HostBinding('class.btn-icon') get className () {
    return this.btnIcon;
  }

  get iconPath(): string {
    if (!this.name) return '';

    return this.icons.getIcon(this.name).path[this.iconStyle];
  }

  constructor() {
    this.icons = new IconsLoader();
  }

}
