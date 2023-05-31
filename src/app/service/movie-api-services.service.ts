import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServicesService {
   API_KEY = 'f872ad90dd1';
   API_URL = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient)  { }


searchFilms(query: string) {
  const url = `${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${query}`;
  return this.http.get(url);
}

//filmpopolari
getPopularMovies(): Observable<any> {
  return this.http.get(`${this.API_URL}movie/popular?api_key=${this.API_KEY}`);
}
/*Utilizzo il metodo `get`
 di HttpClient per effettuare una
  richiesta GET all'API TMDb, fornendo
  l'endpoint specifico e
  l'API key come parametri.
  per i film popolari, uso l'endpoint
   `popular`*/

   //bannerapidata

  bannerApiData(): Observable<any> {
    // return this.http.get(`${this.API_URL}/trending/all/week?api_key=${this.API_KEY}`);
    return this.http.get(`${this.API_URL}movie/popular?api_key=${this.API_KEY}`);
  }




  // searchmovive
  getSearchMovie(data: any): Observable<any> {
    console.log(data, 'movie#');

    return this.http.get(`${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${data.movieName}`);
  }

  // getmoviedatails
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${data}?api_key=${this.API_KEY}`)
  }

  // getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${data}/videos?api_key=${this.API_KEY}`)
  }


  getMovieRating(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${data.movieName.vote_average}`);
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${data}/credits?api_key=${this.API_KEY}`)
  }
  // action
  fetchActionMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}/discover/movie?api_key=${this.API_KEY}&with_genres=28`);
  }




}

