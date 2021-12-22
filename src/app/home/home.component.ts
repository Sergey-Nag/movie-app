import { Component, OnInit } from '@angular/core';
import { MovieData } from '../movie-card/movie.type';
import { CategodyData } from '../movie-category-card/category.type';
import { MovieComingData } from '../movie-coming-card/movie-coming.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: MovieData[] = [
    {
      title: 'Luca',
      coverUrl: 'https://whatsondisneyplus.com/wp-content/uploads/2021/06/ECAFFA0F-5F8D-476A-95BC-F43671D984C8.jpeg',
      duration: 120,
      pg: 'p'
    },
    {
      title: 'Lorax',
      coverUrl: 'https://image.tmdb.org/t/p/original/3rfClKuMmhFawkdCJXMEV3OGOJ3.jpg',
      duration: 125,
      pg: 'p'
    },
    {
      title: 'Ron\'s Gone Wrong Ron\'s',
      coverUrl: 'https://bestdramalist.com/wp-content/uploads/2021/10/ron_s_gone_wrong-719634029-large.jpg',
      duration: 132,
      pg: 'p'
    },
    {
      title: 'Luca',
      coverUrl: 'https://whatsondisneyplus.com/wp-content/uploads/2021/06/ECAFFA0F-5F8D-476A-95BC-F43671D984C8.jpeg',
      duration: 120,
      pg: 'p'
    },
    {
      title: 'Lorax',
      coverUrl: 'https://image.tmdb.org/t/p/original/3rfClKuMmhFawkdCJXMEV3OGOJ3.jpg',
      duration: 125,
      pg: 'p'
    },
    {
      title: 'Ron\'s Gone Wrong',
      coverUrl: 'https://bestdramalist.com/wp-content/uploads/2021/10/ron_s_gone_wrong-719634029-large.jpg',
      duration: 132,
      pg: 'p'
    },
    {
      title: 'Black Widow',
      coverUrl: 'https://i.pinimg.com/originals/63/75/d6/6375d67101c5abdd7c52bcc48f503543.jpg',
      duration: 129,
      pg: 'c13'
    },{
      title: 'Ron\'s Gone Wrong',
      coverUrl: 'https://bestdramalist.com/wp-content/uploads/2021/10/ron_s_gone_wrong-719634029-large.jpg',
      duration: 132,
      pg: 'p'
    },
  ];
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
  constructor() { }
  
  ngOnInit(): void {
  }

}
