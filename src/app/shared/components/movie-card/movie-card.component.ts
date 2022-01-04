import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TMDBService } from '../../../core/services/tmdb.service';
import { TMDBPosterSize } from '../../../core/types/tmdb.types';
import { CardBaseComponent } from '../CardBase.component';
import { MovieData } from './movie.type';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent extends CardBaseComponent implements OnInit {
  @Input() movie: MovieData = null;

  get coverUrl() {
    if (!this.movie || !this.tmdb.config) return '';

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
