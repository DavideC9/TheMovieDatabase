import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FacadeService} from "../facade-service/facade.service";
import {forkJoin, Observable, Subscription, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";




@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit, OnDestroy{

  public getMovieDetailResult:any;
  public combineMovieDetail$: Observable<any>;
  public subscriptions: Subscription[] = [];
  constructor(private router: ActivatedRoute,
              private snackBar: MatSnackBar,
              private facade: FacadeService){}




  ngOnInit(): void {
    const movieId = this.router.snapshot.paramMap.get('id');
    console.log(movieId,'getparamid#')
    this.combineMovieDetail$ = this.combineMovieDetails$(movieId);
  }

  public combineMovieDetails$(id: any): Observable<any> {
    return forkJoin({
      movieDetails: this.facade.getMovieDetails(id),
      movieVideo: this.facade.getMovieVideo(id),
      movieCast: this.facade.getMovieCast(id)
    }).pipe(
        tap((res) =>
        console.log(res.movieDetails)),
        map((results: any) => ({
          getMovieDetailResult: results.movieDetails,
          getMovieVideoResult: results.movieVideo.results.find((element: any) => element.type === "Trailer")?.key,
          getMovieCastResult: results.movieCast.cast
        })),
        catchError(error => {
          console.error('Errore durante il recupero dei film d\'azione.');
          return throwError(error);
        })
    );
  }

    public addToFavorites() {
        const sb = this.combineMovieDetail$
            .pipe(
                tap((combinedData: any) => {
                    if (!combinedData || !combinedData.getMovieDetailResult || !combinedData.getMovieDetailResult.id) {
                        console.error('Impossibile aggiungere ai preferiti: dettagli del film mancanti o ID non definito.');
                        return;
                    }

                    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
                    const movieToAdd = {
                        id: combinedData.getMovieDetailResult.id,
                        title: combinedData.getMovieDetailResult.original_title,
                    };

                    const isAlreadyAdded = favorites.some((movie: any) => movie.id === movieToAdd.id);

                    if (!isAlreadyAdded) {
                        favorites.push(movieToAdd);
                        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
                        this.snackBar.open('Film aggiunto ai Preferiti!', 'Chiudi', {
                            duration: 3000,
                            horizontalPosition: 'end',
                            verticalPosition: 'bottom',
                        });
                    } else {
                        this.snackBar.open('Il film è già presente nei preferiti', 'Chiudi', {
                            duration: 3000,
                            horizontalPosition: 'end',
                            verticalPosition: 'bottom',
                        });
                    }
                }),
            )
            .subscribe();
        this.subscriptions.push(sb);
    }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
