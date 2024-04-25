import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(public authSvc: AuthService, private router: Router) {}

  submitLoginData() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    console.log('Login Data:', loginData);

    this.authSvc.loginUser(loginData).subscribe(
      (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/kanban']);
      },
      (error) => {
        console.error('Error occurred during login:', error);
        //TODO: Add error handling!
      }
    );

    this.email = '';
    this.password = '';
  }
}
