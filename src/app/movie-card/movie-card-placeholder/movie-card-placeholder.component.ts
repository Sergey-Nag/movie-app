import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-movie-card-placeholder',
  templateUrl: './movie-card-placeholder.component.html',
  styleUrls: ['./movie-card-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardPlaceholderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
