import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthServicesService} from "../../core/services/auth-services/auth-services.service";
import {HttpResponse} from "@angular/common/http";
import {FavoriteMoviesService} from "../../core/services/favorite-movies.service";
import {MovieApiServicesService} from "../../core/services/movie-api-services.service";
import {IMovies} from "../../core/models/IMovies";
import {ISignup} from "../../core/models/ISignup";
import {CategoriesServiceService} from "../categories/caregories-service/categories-service.service";
import {IMovieGenre} from "../categories/models/IMovieGenre";

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private authService: AuthServicesService,
              private favoriteMovies: FavoriteMoviesService,
              private service: MovieApiServicesService,
              private cateriesService: CategoriesServiceService) {
  }


  public signup(registrationObject: ISignup): Observable<HttpResponse<any>> {
    return this.authService.signup(registrationObject);
  }

  public login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.authService.login(email, password);
  }

  public logOut(userId: string): Observable<HttpResponse<any>> {
    return this.authService.logOut(userId);
  };

  public getIsLoggedIn$(): Observable<boolean> {
    return this.authService.getIsLoggedIn$();
  }

  public getIsLoggedIn(): boolean {
    return this.authService.getIsLoggedIn();
  }

  public setIsLoggedIn(value: boolean): void {
    this.authService.setIsLoggedIn(value);
  }


  public setPopularMoviesSubject(value): void {
    return this.service.setPopularMoviesSubject(value);
  }

  public getPopularMoviesSubject$(): Observable<any> {
    return this.service.getPopularMoviesSubject$();
  }


  public getPopularMovies(): Observable<HttpResponse<IMovies>> {
    return this.service.getPopularMovies();
  }

  public getFavoriteMovies(): number[] | null {
    return this.favoriteMovies.getFavoriteMovies();
  }

  public getSearchByActress(data: any) {
    return this.service.getSearchByActress(data);
  }

  public getSearchByMovie(data: any) {
    return this.service.getSearchMovie(data);
  }

  public searchMoviesByGenre(genreId: number): Observable<HttpResponse<any>> {
    return this.service.searchByGenre(genreId);
  }

  public getGenreId(genreName: string): Observable<number> {
    return this.service.getGenreId(genreName);
  }


  public getMovieVideo(movieId: string): Observable<any> {
    return this.service.getMovieVideo(movieId);
  }

  public getMovieDetails(movieId: string): Observable<any> {
    return this.service.getMovieDetails(movieId);
  }

  public getMovieCast(movieId: string): Observable<any> {
    return this.service.getMovieCast(movieId);
  }

  public getGenres(): Observable<IMovieGenre[]> {
    return this.cateriesService.getGenres();
  }

  public getActionMovies(): Observable<IMovieGenre> {
    return this.cateriesService.getActionMovies();
  }

}
