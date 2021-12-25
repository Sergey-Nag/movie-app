import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TMDBService } from '../shared/services/tmdb.service';
import { TMDBPosterSize } from '../shared/services/tmdb.types';
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
    if (!this.movie) return '';

    return new Date(this.movie.comingDate).toLocaleDateString();
  }

  get coverUrl() {
    if (!this.movie || !this.tmdb.config) return '';
    
    const { secure_base_url, poster_sizes } = this.tmdb.config.images;
    
    return `${secure_base_url}${poster_sizes[TMDBPosterSize.w342]}${this.movie.coverUrl}`;
  };

  constructor(private tmdb: TMDBService) { }

  ngOnInit(): void {
  }

}
