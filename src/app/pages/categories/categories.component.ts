import { Component } from '@angular/core';
import { MovieApiServicesService } from 'src/app/service/movie-api-services.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  actionMovies: any[] = [];
  popularMovies: any[] = [];

  constructor(private movieApiService: MovieApiServicesService) { }

  ngOnInit() {
    this.fetchActionMovies();
    this.fetchPopularMovies();
  }

  fetchActionMovies() {
    this.movieApiService.fetchActionMovies().subscribe((data: any) => {
      this.actionMovies = data.results;
    });
  }

  fetchPopularMovies() {
    this.movieApiService.getPopularMovies().subscribe((data: any) => {
      this.popularMovies = data.results;
    });
  }

}
