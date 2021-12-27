import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieRatingComponent implements OnInit {
  @Input() points: number;
  @Input() votes: number;  
  
  maxStars = 5;
  stars: string[];

  constructor() {}

  ngOnInit(): void {
    const path = 'assets/icons/';
    const percent = this.points * (this.maxStars / 10);

    this.stars = [...new Array(this.maxStars)].map((el, i) => {
      const pos = i + 1;
      
      if (pos - percent < 0) {
        return path + 'Star-fill.svg';
      } else if (pos - percent > 0 && pos - percent < 1) {
        return path + 'Star-half-fill.svg';
      }

      return  path + 'Star.svg';
    });
  }

}
