import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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
  isMoviesLoading = true;

  movies: MovieData[] = [];

  comingMovies: MovieComingData[] = [
    {
      title: 'Luca',
      coverUrl: 'https://whatsondisneyplus.com/wp-content/uploads/2021/06/ECAFFA0F-5F8D-476A-95BC-F43671D984C8.jpeg',
      duration: 120,
      pg: 'p',
      comingDate: new Date().toString()
    },
    {
      title: 'Luca',
      coverUrl: 'https://whatsondisneyplus.com/wp-content/uploads/2021/06/ECAFFA0F-5F8D-476A-95BC-F43671D984C8.jpeg',
      duration: 120,
      pg: 'p',
      comingDate: new Date().toString()
    },
    {
      title: 'Luca',
      coverUrl: 'https://whatsondisneyplus.com/wp-content/uploads/2021/06/ECAFFA0F-5F8D-476A-95BC-F43671D984C8.jpeg',
      duration: 120,
      pg: 'p',
      comingDate: new Date().toString()
    },
  ];
  categories: CategodyData[] = [
    {
      title: 'Animation',
      coverUrl: 'https://getwallpapers.com/wallpaper/full/a/b/6/1076206-pixar-up-wallpaper-2560x1600-for-iphone-6.jpg'
    },
    {
      title: 'Action',
      coverUrl: 'https://telekritika.ua/tk-static/2019/04/surprise_marvel_releases_a_new_full_trailer_and_poster_for_avengers_endgame_social.0.jpg'
    },
    {
      title: 'Horror',
      coverUrl: 'https://images.kinorium.com/movie/shot/555028/w1500_1281880.jpg'
    },
    {
      title: 'Romance',
      coverUrl: 'https://s.032.ua/section/newsInText/upload/images/news/intext/000/051/764/do-zustrici-z-tobou_5e455f7d69eeb.jpg'
    },
    {
      title: 'Action',
      coverUrl: 'https://telekritika.ua/tk-static/2019/04/surprise_marvel_releases_a_new_full_trailer_and_poster_for_avengers_endgame_social.0.jpg'
    },
  ];
  constructor(private cdRef: ChangeDetectorRef, private tmdb: TMDBService) { }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.isMoviesLoading = false;
      this.cdRef.detectChanges();
    }, 2000);

    this.tmdb.setConfig();
    this.tmdb.getPopular().subscribe((data)=> {
      this.movies = data.results;
    });
  }

}
