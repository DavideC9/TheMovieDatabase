import {Component, OnDestroy, OnInit} from '@angular/core';
import {FacadeService} from "../../../pages/facade-service/facade.service";
import {NgForm} from "@angular/forms";
import {catchError, tap} from "rxjs/operators";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription, throwError} from "rxjs";
import {AlertServiceService} from "../../services/alert-service.service";
import {ISignup} from "../../models/ISignup";


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit, OnDestroy {
  public password: string = '';
  public accessToken = 'accessToken';
  public refreshToken = 'refreshToken';
  public userId = 'UserID';
  public title= '';
  public islogged$ = this.pagesFacade.getIsLoggedIn$();
  public isLoginForm = true;
  public name: string = '';
  public email: string = '';

  public subscriptions: Subscription[] = [];


  constructor(private pagesFacade: FacadeService,
              private ngbModal: NgbModal,
              public activeModal: NgbActiveModal,
              private alertService: AlertServiceService) {
  }


  ngOnInit(): void {
    if (this.checkToken()) {
      this.title = 'Registrati';
    }
    this.title = 'Esegui l\'accesso';
  }

  public toggleForm() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('UserID');
    this.isLoginForm = !this.isLoginForm;
  }

  public register(registerForm: NgForm) {
    const registrationObject: ISignup = registerForm.value;
    const sb = this.pagesFacade.signup(registrationObject).pipe(
      tap((response) => {
        localStorage.setItem(this.accessToken, response?.body?.accessToken);
        localStorage.setItem(this.refreshToken, response?.body?.refreshToken);
        localStorage.setItem(this.userId, response?.body?.userId);
        this.pagesFacade.setIsLoggedIn(true);
        this.activeModal.close(true);
        console.log(response);
      }),
      catchError((error) => {
        console.error(error)
        this.alertService.showError('Errore durante la registrazione')
        return throwError(error);
      })
    ).subscribe();
    this.subscriptions.push(sb);

  }

  public login(loginForm: NgForm): void {
    const {email, password} = loginForm.value;
    console.log(email, password);
    const sb = this.pagesFacade.login(email, password).pipe(
      tap((response) => {
        localStorage.setItem(this.accessToken, response?.body?.accessToken);
        localStorage.setItem(this.refreshToken, response?.body?.refreshToken);
        localStorage.setItem(this.userId, response?.body?.userId);
        this.pagesFacade.setIsLoggedIn(true);
        this.activeModal.close(true);
        console.log(response);
      }),
      catchError((error) => {
        console.error(error)
        this.alertService.showError('Errore durante l\'accesso')
        return throwError(error);
      })
    ).subscribe();
    this.subscriptions.push(sb);
  }


  public checkToken(): boolean {
    return !!(localStorage.getItem(this.accessToken) && localStorage.getItem(this.accessToken)
      && localStorage.getItem(this.userId));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
