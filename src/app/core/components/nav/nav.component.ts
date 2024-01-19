import {Component, OnDestroy, OnInit} from '@angular/core';
import {FacadeService} from "../../../pages/facade-service/facade.service";
import {catchError, tap} from "rxjs/operators";
import {Subscription, throwError} from "rxjs";
import {AlertServiceService} from "../../services/alert-service.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {erroEnum} from "../../enums/errorEnum";


@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
    public IsLoggedIn$ = this.facade.getIsLoggedIn$();
    public isCollapsed = true;
    public userId = 'UserID';
    public errorMessage: string;
    public subscriptions: Subscription[] = [];

    constructor(private facade: FacadeService,
                private alertService: AlertServiceService,
                private router: Router) {

    }

    ngOnInit() {
    }


    public logOut() {
        console.log('loguout', this.userId);
        const userId = localStorage.getItem(this.userId);
        if (!!userId) {
            const sb = this.facade.logOut(userId).pipe(
                tap((res) => {
                    console.log('ciao', res);
                    this.facade.setIsLoggedIn(false);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem(this.userId);
                    this.router.navigate(['/']);
                }),
                catchError((error: HttpErrorResponse) => {
                    // Errore del client
                    this.errorMessage = `${error.error.message}`;
                    this.alertService.showError('Errore: ${this.errorMessage}');
                    if (this.errorMessage === erroEnum.TOKEN_EXPIRED){
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        localStorage.removeItem('UserID');
                        this.facade.setIsLoggedIn(false);
                        console.log('ciao');
                    }
                    console.error(error);
                    return throwError(error);
                })
            ).subscribe();
            this.subscriptions.push(sb);

        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }


}

