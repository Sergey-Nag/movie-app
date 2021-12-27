import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-movie-list-collapsed',
  templateUrl: './movie-list-collapsed.component.html',
  styleUrls: ['./movie-list-collapsed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListCollapsedComponent implements OnInit {
  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
