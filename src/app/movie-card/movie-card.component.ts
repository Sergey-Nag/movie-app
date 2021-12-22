import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MovieData } from './movie.type';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent implements OnInit {
  @Input() movie: MovieData = null;
  constructor() { }

  ngOnInit(): void {
  }

}
