import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MovieComingData } from './movie-coming.interface';

@Component({
  selector: 'app-coming-movie-card',
  templateUrl: './movie-coming-card.component.html',
  styleUrls: ['./movie-coming-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComingCardComponent implements OnInit {
  @Input() movie: MovieComingData = null;

  get date() {
    return new Date(this.movie.comingDate).toLocaleDateString();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
