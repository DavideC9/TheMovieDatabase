import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  popularMovies : any = [];
  title = 'TheMovieDatabase';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getPopularMovies().subscribe((data: any) => {
      this.popularMovies = data.results;
    });
  }

  newUser(){

  }
}
