import {AlertServiceService} from './alert-service.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {IMovies} from "../models/IMovies";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MovieApiServicesService {
    private apiUrl = environment.apiUrl;
    private apiKey = environment.api_key;



    public popularMoviesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

    constructor(private http: HttpClient, private alertService: AlertServiceService) {
    }

    public setPopularMoviesSubject(value): void {
        this.popularMoviesSubject.next(value);
    }

    public getPopularMoviesSubject$(): Observable<any> {
        return this.popularMoviesSubject.asObservable();
    }

    public getPopularMovies(): Observable<HttpResponse<IMovies>> {
        return this.http.get<IMovies>(`${this.apiUrl}movie/popular?api_key=${this.apiKey}`, {observe: 'response'});
    }

    public getSearchMovie(data: any): Observable<any> {
        console.log(data, 'movie#');
        return this.http.get(`${this.apiUrl}search/movie?api_key=${this.apiKey}&query=${data.movieName}`);
    }

    public searchByGenre(genreId: number): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}discover/movie`;
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('with_genres', `${genreId}`);

        return this.http.get<any>(url, { params });
    }



    public getGenreId(genreName: string): Observable<number> {
        const url = `${this.apiUrl}genre/movie/list`;
        const params = new HttpParams().set('api_key', this.apiKey);

        return this.http.get<any>(url, { params }).pipe(map(response => {
            const genres = response.genres || [];
            const foundGenre = genres.find((genre: any) => genre.name.toLowerCase() === genreName.toLowerCase());
            return foundGenre ? foundGenre.id : null;
        }));
    }

    public getSearchByActress(data: any): Observable<any> {
        console.log(data, 'byactress#');
        return this.http.get(`${this.apiUrl}search/person?api_key=${this.apiKey}&query=${data.actressName}`);
    }

    public getMovieDetails(movieId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`);
    }

    public getMovieVideo(movieId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`);
    }

    public getMovieCast(movieId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
    }
}
