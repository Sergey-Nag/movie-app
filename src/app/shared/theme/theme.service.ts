import { Inject, Injectable, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Theme } from './theme.constants';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: Theme.Light | Theme.Dark = Theme.Light;
  theme: BehaviorSubject<Theme> = new BehaviorSubject(window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light);

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.changeThemeTo(window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light);
  }

  changeThemeTo(theme: Theme) {
    if (this.currentTheme === theme) return;
    const isDark = !!theme;

    this.document.documentElement.style.setProperty('--theme-color-text', `var(--${isDark ? 'light' : 'dark'})`);
    this.document.documentElement.style.setProperty('--theme-color-bg', `var(--${isDark ? 'dark' : 'light'})`);
    this.document.documentElement.style.setProperty('--theme-color-bg-inversed', `var(--${isDark ? 'dark' : 'light'}-inversed)`);
    this.document.documentElement.style.setProperty('--theme-accent', `var(--accent${isDark ? '-lighten' : ''})`);
    this.document.documentElement.style.setProperty('--theme-blue', `var(--${isDark ? 'blue' : 'accent'})`);
    this.document.documentElement.style.setProperty('--theme-blue-lighten', `var(--${isDark ? 'blue' : 'accent'}-lighten)`);
    
    this.currentTheme = theme;

    this.theme.next(theme);
  }
}
