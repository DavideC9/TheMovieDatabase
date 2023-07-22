import { Component } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  username: any;
  isRegistrationInProgress = false;
  isLoginInProgress = false;
  isFormVisible = false;

  constructor(private authService: AuthServiceService) { }

  register(): void {
    this.isRegistrationInProgress = true;
    this.authService.registerUser(this.username).subscribe(success => {
      if (success) {
        alert('Registration successful');
        this.isFormVisible = false;
      } else {
        alert('Username already taken');
      }
      this.isRegistrationInProgress = false;
    });
  }

  login(): void {
    this.isLoginInProgress = true;
    this.authService.loginUser(this.username).subscribe(success => {
      if (success) {
        alert('Login successful');
        this.isFormVisible = false;
      } else {
        alert('Invalid username');
      }
      this.isLoginInProgress = false;
    });
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
