import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { MovieData } from '../movie-card/movie.type';
import { CategodyData } from '../movie-category-card/category.type';
import { MovieComingData } from '../movie-coming-card/movie-coming.interface';
import { TMDBService } from '../shared/services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class HomeComponent implements OnInit {
  movies: MovieData[] = [];
  comingMovies: MovieComingData[] = []
  categories: CategodyData[] = [];

  constructor(private cdRef: ChangeDetectorRef, private tmdb: TMDBService) { }
  
  ngOnInit(): void {
    this.tmdb.setConfig();
    this.tmdb.getPopular()
      .subscribe((data)=> {
        this.movies = data.results;
        this.cdRef.detectChanges();
      });

    this.tmdb.getGenres()
      .subscribe(({genres}: any)=> {
        this.categories = genres.map((genre) => ({title: genre.name, coverUrl: 'https://telekritika.ua/tk-static/2019/04/surprise_marvel_releases_a_new_full_trailer_and_poster_for_avengers_endgame_social.0.jpg'}))
        this.cdRef.detectChanges();
      })

    this.tmdb.getUpcoming()
      .subscribe(({results}: any) => {
        this.comingMovies = results;
        this.cdRef.detectChanges();
      })
  }

}
