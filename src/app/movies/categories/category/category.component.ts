import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { combineAll, concatAll, filter, map, mapTo, pairwise, switchMap, take } from 'rxjs/operators';
import { BackgroundImageService } from 'src/app/core/services/background-image.service';
import { TMDBService } from 'src/app/core/services/tmdb.service';
import { TMDBPosterSize } from 'src/app/core/types/tmdb.types';
import { DatabaseService } from 'src/app/firebase/database.service';
import { MovieData } from 'src/app/shared/components/movie-card/movie.type';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit, OnDestroy {
  private bgSub: Subscription;
  private moviesSub: Subscription;

  movies: MovieData[] = [];
  categoryName = '';

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    private bgImage: BackgroundImageService,
    private tmdb: TMDBService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.bgSub = this.route.params
      .pipe(
        map(({id}: any) => {
          this.tmdb.getGenres().subscribe((genres) => {
            this.categoryName = genres.find((genre) => genre.id === +id).name;
          });
          return id;
        }),
        switchMap((id) => this.db.getCategoryBackdrop(id)),
        filter((backdropSrc) => !!backdropSrc),
        switchMap((backdropSrc) => this.tmdb.getBackdropPath('/'+backdropSrc, TMDBPosterSize.w500)),
      )
      .subscribe((backdropSrc) => {
        this.bgImage.setImage(backdropSrc);
      });
    
    this.moviesSub = this.route.params
      .pipe(
        switchMap(({id}: any) => this.tmdb.getDiscoverMovieBy({
          with_genres: id,
        }))
      ).subscribe((data) => {
        this.movies = data.results;
        console.log(this.movies);
        
        this.cdRef.detectChanges();
      });
      
  }

  ngOnDestroy(): void {
    this.bgSub.unsubscribe();
    this.moviesSub.unsubscribe();
    this.bgImage.removeImage();
  }

}
