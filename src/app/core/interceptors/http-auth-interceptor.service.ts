import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {erroEnum} from "../enums/errorEnum";
import {FacadeService} from "../../pages/facade-service/facade.service";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor{

  constructor(private facade: FacadeService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    return next.handle(request);/*.pipe(
        catchError((error: HttpErrorResponse) => {
          // Qui gestisci l'errore come preferisci
          if (error.message === erroEnum.TOKEN_EXPIRED){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('UserID');
            this.facade.setIsLoggedIn(false);
            console.log('ciao');
          }
          console.error('Errore durante la richiesta:', error);
          // Puoi rilanciare l'errore per farlo gestire ai componenti che effettuano la richiesta
          return throwError(error);
        })
    );;*/
  }
}
