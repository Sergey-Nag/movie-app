import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, of, Subscription } from 'rxjs';
import { find, map, switchMap } from 'rxjs/operators';
import { BackgroundImageService } from 'src/app/core/services/background-image.service';
import { TMDBService } from 'src/app/core/services/tmdb.service';
import { MovieDetails, MovieImages, TMDBImage, TMDBPosterSize } from 'src/app/core/types/tmdb.types';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit, OnDestroy {
  private paramsSubsribtion: Subscription;
  private logosSubscribtion: Subscription;
  movie: MovieDetails;
  movieLoaded = false;
  logos: TMDBImage[];

  constructor(
    private route: ActivatedRoute,
    private tmdb: TMDBService,
    private bgImage: BackgroundImageService,
    private cdRef: ChangeDetectorRef) { }

  getImageUrl(path: string) {
    return this.tmdb.getImagePath(path);
  }

  ngOnInit(): void {
    this.paramsSubsribtion = this.route.params
      .pipe(
        switchMap(({id}: any) => {
          return this.tmdb.getMovieImages(id)
            .pipe(
              map(({id, logos}: MovieImages) => ({
                id,
                logo: logos.find((el: TMDBImage) => el.iso_639_1 === 'en'),
              })),
            );
        }),
        switchMap((data: any) => {
          this.logos = [data.logo];
          console.log(data.logos);
          
          return of(data.id)
        }),
        switchMap((id: number) => {
          return this.tmdb.getMovie(id);
        }),
      )
      .subscribe((data) => {
        this.movie = data;
        console.log(data);
  
        this.cdRef.detectChanges();
        this.bgImage.setImage(
          this.tmdb.getBackdropPath(this.movie.backdrop_path, TMDBPosterSize.original)
          );
      });

  }

  ngOnDestroy(): void {
    this.bgImage.removeImage();
    this.paramsSubsribtion.unsubscribe();
  }

}
