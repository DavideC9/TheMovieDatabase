import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private registeredUsers: string[] = [];

  registerUser(username: string): Observable<boolean> {
    return of(this.isUsernameTaken(username)).pipe(
      delay(1000),
      tap(isTaken => {
        if (!isTaken) {
          this.registeredUsers.push(username);
        }
      }),
      map(isTaken => !isTaken)
    );
  }

  loginUser(username: string): Observable<boolean> {
    return of(this.registeredUsers.includes(username)).pipe(
      delay(1000),
      tap(isLoggedIn => {
        if (isLoggedIn) {
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logoutUser(): void {
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private isUsernameTaken(username: string): boolean {
    return this.registeredUsers.includes(username);
  }
}
