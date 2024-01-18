import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ISignup} from "../../models/ISignup";

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  private apiUrl = environment.apiUrl_user;
  private accessTokenKey = 'accessToken';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) {
  }

  public getIsLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public setIsLoggedIn(value: any): void {
    this.isLoggedInSubject.next(value);
  }

  public getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  public logoutUser(): void {
    this.isLoggedInSubject.next(false);
  }

  public signup(registrationObject: ISignup): Observable<HttpResponse<any>> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(
      `${this.apiUrl}/accounts/signup`,
        registrationObject,
      { headers, observe: 'response' }
    );
  }



  public login(email: string, password: string): Observable<HttpResponse<any>> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(
      `${this.apiUrl}/accounts/login`,
      body,
      { headers, observe: 'response' }
    );
  }

  public logOut(userId: string ): Observable<HttpResponse<any>> {
    const body = new HttpParams()
        .set('userId', `${userId}`);

    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    console.log('----> ',this.apiUrl);

    return this.http.post<any>(`${this.apiUrl}/accounts/logout`, body,{headers, observe: 'response'} );
  }


}
