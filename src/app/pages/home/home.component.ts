import { HttpResponse } from '@angular/common/http';
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
    this.service.bannerApiData().subscribe((result: HttpResponse<any>) => {
      console.log(result, 'filmbannerresult#');
      this.bannerResult = result.body.results; // Assumendo che i dati siano nel corpo della risposta
      console.log('Lo status è', result.status);

      if (result.status === 200) {
        // La chiamata è andata a buon fine (stato 200)
        console.log('La risposta è 200', result);
      } else {
        // Altrimenti, gestisci il caso in cui lo stato non sia 200
        console.error('La chiamata ha restituito uno stato diverso da 200:', result.status);
      }
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
