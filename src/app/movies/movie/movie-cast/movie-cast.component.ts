import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { TMDBService } from 'src/app/core/services/tmdb.service';
import { CastMember, TMDBPosterSize } from 'src/app/core/types/tmdb.types';

@Component({
  selector: 'app-movie-cast',
  templateUrl: './movie-cast.component.html',
  styleUrls: ['./movie-cast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCastComponent implements OnInit {
  @Input() id: number;
  
  cast: CastMember[];

  constructor(private tmdb: TMDBService, private cdRef: ChangeDetectorRef) { }

  getPhoto(castMember: CastMember) {
    return this.tmdb.getImagePath(castMember.profile_path, TMDBPosterSize.w92);
  }

  ngOnInit(): void {
    this.tmdb.getMovieCredits(this.id)
      .subscribe((data) => {
        console.log(data);
        this.cast = data.cast;
        this.cdRef.detectChanges();
      });
  }

}
