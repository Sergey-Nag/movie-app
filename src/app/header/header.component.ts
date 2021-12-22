import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Theme } from '../shared/theme/theme.constants';
import { ThemeService } from '../shared/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  private themeSub:Subscription;
  isAuthorized = true;
  themeValue: number = Theme.Light;

  constructor(
    private cdRef: ChangeDetectorRef,
    private theme: ThemeService,
  ) { }

  ngOnInit(): void {
    this.themeSub = this.theme.theme.subscribe((theme) => {
      this.themeValue = theme;      
    });
  }

  ngOnDestroy(): void {
    this.themeSub.unsubscribe();
  }

  setTheme(atRight: boolean): void {
    this.theme.changeThemeTo(atRight ? Theme.Dark : Theme.Light);
  }
}
