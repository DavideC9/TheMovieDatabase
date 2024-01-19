import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Meta, Title} from '@angular/platform-browser';
import {FacadeService} from "../facade-service/facade.service";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {forkJoin, Observable, of, Subscription, throwError} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";


@Component({
    selector: 'app-search-film',
    templateUrl: './search-film.component.html',
    styleUrls: ['./search-film.component.css']
})
export class SearchFilmComponent implements OnInit, OnDestroy {
    public searchterm: string = '';
    public results: any[] = [];
    public searchResult: any;
    public pageSize: any;
    private subscriptions: Subscription[] = [];
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private facade: FacadeService,
                private title: Title,
                private router: Router,
                private meta: Meta) {
        this.title.setTitle('Search movies - showtime');
        this.meta.updateTag({name: 'description', content: 'search here movies like avatar,war etc'});
    }

    ngOnInit(): void {
        const sb = this.paginator?.page.pipe(
            tap((event: PageEvent) => {
                this.submitForm();
            })).subscribe();
        this.subscriptions.push(sb);

    }

    public handlePage(event: PageEvent) {
        this.paginator.pageIndex = event.pageIndex;
        this.paginator.pageSize = event.pageSize;
        this.submitForm();
    }


    searchForm = new FormGroup({
        'movieName': new FormControl(),
        'actressName': new FormControl(),
        'genre': new FormControl()
    });


    submitForm() {
        const searchByActress$ = this.searchForm.value.actressName ?
            this.facade.getSearchByActress(this.searchForm.value).pipe(
                map((res) => res?.results?.map((item: any) => item?.known_for).flat() || []),
                catchError((error) => {
                    console.error('Errore nella ricerca per attore:', error);
                    return throwError(error);
                })
            ) : of([]);

        const searchByMovie$ = this.searchForm.value.movieName ?
            this.facade.getSearchByMovie(this.searchForm.value).pipe(
                map((result) => result.results || []),
                catchError((error) => {
                    console.error('Errore nella ricerca per film:', error);
                    return throwError(error);
                })
            ) : of([]);

        const searchByGenre$ = this.searchForm.value.genre ?
            this.searchByGenre$(this.searchForm.value.genre).pipe(
                map((result) => result?.body || []),
                catchError((error) => {
                    console.error('Errore nella ricerca per genere:', error);
                    return throwError(error);
                })
            ) : of([]);

        forkJoin([searchByActress$, searchByMovie$, searchByGenre$]).pipe(
            tap(([byActress, byMovie, byGenre]) => {
                this.searchResult = [...byActress, ...byMovie, ...byGenre];
                this.paginator?.firstPage();

                const startIndex = this.paginator?.pageIndex * this.paginator?.pageSize;
                const endIndex = startIndex + this.paginator?.pageSize;
                this.results = this.searchResult.slice(startIndex, endIndex);
            })
        ).subscribe();
    }

    public searchByGenre$(genreName: string): Observable<HttpResponse<any>> {
        return this.facade.getGenreId(genreName).pipe(
            switchMap((res) => {
                console.log(res);
                return this.searchMovieByGenreId$(res);
            }));

    }

    public searchMovieByGenreId$(genreId: number): Observable<HttpResponse<any>> {
        return this.facade.searchMoviesByGenre(genreId);
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription?.unsubscribe())
    }

    public showDetails(id: string) {
        this.router.navigate(['film-detail', id]);

    }
}
