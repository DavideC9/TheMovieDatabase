import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {FacadeService} from "./pages/facade-service/facade.service";
import {tap} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {ModalLoginOrRegistrationComponent} from "./core/components/modal-login/modal-loginOrRegistration.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {


    title = 'TheMovieDatabase';
    private accessTokenKey = 'accessToken';
    public accessToken = 'accessToken';
    public refreshToken = 'refreshToken';
    public userId = 'UserID';
    public subscriptions: Subscription[] = [];



    constructor(private ngbModal: NgbModal,
                private router: Router,
                private facade: FacadeService) {
    }

    ngOnInit() {
        if (this.checkToken()){
            this.facade.setIsLoggedIn(true);
        }
        const sb = this.checkIfUsersHasAlreadyLoggedIn$().subscribe();
        this.subscriptions.push(sb);
    }


    public openModalForRegistrationAndLogin() {
        const modalRef = this.ngbModal.open(ModalLoginOrRegistrationComponent, {
            centered: true,
            beforeDismiss: () => {
                return false;
            }
        });
        modalRef.result.then((result) => {
            if (result) {
                this.facade.setIsLoggedIn(true);
                this.router.navigate(['/']);
            }
        })
    }

    public checkIfUsersHasAlreadyLoggedIn$():Observable<any> {
        return this.facade.getIsLoggedIn$().pipe(
            tap((res) => {
                if (res === false || !this.checkToken()){
                    this.openModalForRegistrationAndLogin();}
            })
        );
    }


    public getIsThereAccessToken(): boolean {
        const accessToken = localStorage.getItem(this.accessTokenKey);
        return !!accessToken ? JSON.parse(accessToken) : null;
    }

    private checkToken(): boolean {
        return !!(localStorage.getItem(this.accessToken) && localStorage.getItem(this.accessToken)
            && localStorage.getItem(this.userId));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
