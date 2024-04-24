import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private authSvc: AuthService) {}

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
      },
      (error) => {
        console.error('Error occurred during login:', error);
        // Optionally, handle error response here, such as displaying an error message to the user
      }
    );

    // Reset form fields after submission
    this.email = '';
    this.password = '';
  }
}
