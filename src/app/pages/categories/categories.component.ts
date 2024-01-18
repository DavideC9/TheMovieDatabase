import {Component, OnInit} from '@angular/core';
import {FacadeService} from "../facade-service/facade.service";
import {IMovieGenre} from "./models/IMovieGenre";
import {catchError, switchMap, tap} from "rxjs/operators";
import {forkJoin, Observable, Subscription, throwError} from "rxjs";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    public moviesByGenre: any[] = [];
    public jsonGenreFile: IMovieGenre[] = []
    public apiCallsForGenres: Observable<any>[];
    private subscriptions: Subscription[] = [];

    constructor(private facade: FacadeService) {
    }

    ngOnInit() {
        const sb = this.facade.getGenres().pipe(
            tap((response) => {
                this.jsonGenreFile = response;
                console.log('response----> ', this.jsonGenreFile);
            }),
            switchMap(( _) => {
                return this.getAllMoviesByGenre$();
            }),
            catchError((error) => {
                    console.error('An error occurred:', error);
                    return throwError(error);
                }
            )).subscribe();
        this.subscriptions.push(sb);

    }

    public getAllMoviesByGenre$(): Observable<any> {
        this.apiCallsForGenres = this.jsonGenreFile.map(genre => this.facade.searchMoviesByGenre(genre.id));
        console.log('this.apicallsForGenres----> ', this.apiCallsForGenres);

        const combinedObservables = forkJoin(this.apiCallsForGenres);
        return combinedObservables.pipe(
            tap((responses) => {
                this.moviesByGenre = responses.map(response => response.results);
                console.log('this.moviesByGenre----> ', this.moviesByGenre);
            })

        );
    }




}
