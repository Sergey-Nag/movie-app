import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TMDBService } from '../shared/services/tmdb.service';
import { TMDBPosterSize } from '../shared/services/tmdb.types';
import { CardBase } from '../shared/theme/Card.base';
import { MovieData } from './movie.type';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent extends CardBase implements OnInit {
  @Input() movie: MovieData = null;

  get coverUrl() {
    const { secure_base_url, poster_sizes } = this.tmdb.config.images;
    
    return `${secure_base_url}${poster_sizes[TMDBPosterSize.w342]}${this.movie.coverUrl}`;
  };

  constructor(private tmdb: TMDBService) {
    super();
  }

  ngOnInit(): void {
    // this.tmdb.getImage(this.movie.coverUrl).subscribe((imgpath: string) => {
    //   this.coverUrl = imgpath;
    // })
  }

}
