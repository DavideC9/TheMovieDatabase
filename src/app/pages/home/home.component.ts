import {HttpResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {FacadeService} from "../facade-service/facade.service";
import {Observable, shareReplay, throwError} from "rxjs";
import {IMovies, IMoviesResult} from "../../core/models/IMovies";
import {catchError, map, tap} from "rxjs/operators";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    public bannerResult: IMoviesResult[] | undefined = [];

    @ViewChild('paginator') paginator: MatPaginator;
    public trendingMovieResults$ = this.getPopularMovies$().pipe(
        tap((response) => {
            this.bannerResult = response.body?.results;
        }),
        map(results => {
            const offset = this.currentPage * this.pageSize
            this.totalMovies = results?.body?.results?.length || 0;
            return results?.body?.results.slice(offset, offset + this.pageSize);
        }));

    public pageSizeOptions = [5, 10, 20];
    public pageSize = 5;
    public currentPage = 0;
    public totalMovies: number | undefined = 0;


    constructor(private facade: FacadeService) {
    }


    ngOnInit(): void {
    }

    public getPopularMovies$(): Observable<HttpResponse<IMovies>> {
        return this.facade.getPopularMovies().pipe(
            tap((res) => {
                this.totalMovies = res.body?.results?.length;
            }),
            shareReplay(1),
            catchError((error) => {
                    console.error('An error occurred:', error);
                    return throwError(error);
                }
            ),
            shareReplay({bufferSize: 1, refCount: true})
        );
    }


    public pageChanged(event: any) {
        const pageIndex = event.pageIndex;
        const pageSize = event.pageSize;
        this.currentPage = pageIndex;
        this.pageSize = pageSize;
        console.log(event)

        const offset = pageIndex * pageSize;

        this.trendingMovieResults$ = this.getPopularMovies$().pipe(
            map(results => {
                this.totalMovies = results?.body?.results?.length || 0;
                return results?.body?.results.slice(offset, offset + pageSize);
            })
        );
    }


}
