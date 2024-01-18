import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {IMovieGenre} from "../models/IMovieGenre";

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  private jsonFileGenres = 'assets/genre.json'; // Sostituisci con il percorso o l'URL effettivo del tuo JSON
  private apiUrl = environment.apiUrl;
  private apiKey = environment.api_key;
  constructor(private http: HttpClient) { }

  public getGenres(): Observable<IMovieGenre[]> {
    return this.http.get<IMovieGenre[]>(this.jsonFileGenres);
  }

  public getActionMovies(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=28`);
  }
}
