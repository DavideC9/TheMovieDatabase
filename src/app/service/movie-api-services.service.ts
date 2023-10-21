import { AlertServiceService } from './alert-service.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MovieApiServicesService {
  //  API_KEY = 'f872ad90dd1';
  API_KEY = 'f872ad90dd12e535';
   API_URL = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient, private alertService: AlertServiceService)  { }


  searchFilms(query: string) {
    const url = `${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${query}`;
    return this.http.get(url).pipe(
      catchError(error => {
        this.alertService.showError('Errore durante la ricerca dei film.');
        return throwError(error);
      })
    );
  }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}movie/popular?api_key=${this.API_KEY}`).pipe(
      catchError(error => {
        this.alertService.showError('Errore durante il recupero dei film popolari.');
        return throwError(error);
      })
    );
  }

  bannerApiData(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.API_URL}movie/popular?api_key=${this.API_KEY}`, { observe: 'response' }).pipe(
      catchError((error: HttpResponse<any>) => {
        this.alertService.showError('Errore durante il recupero dei dati del banner.');
        return throwError(error);
      })
    );
  }

  getSearchMovie(data: any): Observable<any> {
    console.log(data, 'movie#');
    return this.http.get(`${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${data.movieName}`).pipe(
      catchError(error => {
        this.alertService.showError('Errore durante la ricerca del film.');
        return throwError(error);
      })
    );
  }

  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${data}?api_key=${this.API_KEY}`).pipe(
      catchError(error => {
        this.alertService.showError('Errore durante il recupero dei dettagli del film.');
        return throwError(error);
      })
    );
  }

  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${data}/videos?api_key=${this.API_KEY}`).pipe(
      catchError(error => {
        this.alertService.showError('Errore durante il recupero del video del film.');
        return throwError(error);
      })
    );
  }

  getMovieRating(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${data.movieName.vote_average}`).pipe(
      catchError(error => {
        this.alertService.showError('Errore durante il recupero del rating del film.');
        return throwError(error);
      })
    );
  }

  getMovieCast(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${data}/credits?api_key=${this.API_KEY}`).pipe(
      catchError(error => {
        this.alertService.showError('Errore durante il recupero del cast del film.');
        return throwError(error);
      })
    );
  }

  fetchActionMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}/discover/movie?api_key=${this.API_KEY}&with_genres=28`).pipe(
      catchError(error => {
        this.alertService.showError('Errore durante il recupero dei film d\'azione.');
        return throwError(error);
      })
    );
  }
}
