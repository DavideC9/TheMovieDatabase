import { Component, OnInit } from '@angular/core';
import { MovieApiServicesService } from 'src/app/service/movie-api-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor (private service:MovieApiServicesService){}


  bannerResult: any = [];
  trendingMovieResult: any = [];
  actionMovieResult: any = [];


  showingDetails = false;

  ngOnInit(): void {
    this.bannerData();
    this.getPopular();
    this.actionMovie();


  }

  // bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      console.log(result, 'filmbannerresult#');
      this.bannerResult = result.results;
    });
  }




  showDetails() {
    this.showingDetails = true;
  }

  hideDetails() {
    this.showingDetails = false;
  }


  getPopular() {
    this.service.getPopularMovies().subscribe((result) => {
      console.log(result, 'popularresult#');
      this.trendingMovieResult = result.results;
      // this.trendingMovieResult
    });
  }

  // action
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }








}
