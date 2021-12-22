import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CategodyData } from './category.type';

@Component({
  selector: 'app-movie-category-card',
  templateUrl: './movie-category-card.component.html',
  styleUrls: ['./movie-category-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCategoryCardComponent {
  @Input() category: CategodyData = null;
  
  get backgroundUrl() {
    return `linear-gradient(to top, rgba(0, 0, 0, .7) 10%, rgba(0, 0, 0, 0)), url(${this.category.coverUrl})`;
  }

  constructor() { }

}
