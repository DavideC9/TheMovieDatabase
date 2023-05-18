import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_KEY = 'f872ad90dd12e535318c7200a765e5e50';
  private API_URL = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}movie/popular?api_key=${this.API_KEY}`);
  }
}



/*Utilizzo il metodo `get`
 di HttpClient per effettuare una
  richiesta GET all'API TMDb, fornendo
  l'endpoint specifico e
  l'API key come parametri.
  per i film popolari, uso l'endpoint
   `popular`*/
