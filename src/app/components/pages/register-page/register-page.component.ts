import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  username!: string;
  email!: string;
  password!: string;
  rePassword!: string;

  constructor(public authSvc: AuthService, private router: Router) {}

  submitRegisterData() {
    if (this.password !== this.rePassword) {
      //TODO: Add error handling!

      console.error('Passwords do not match');
      return;
    }

    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authSvc.registerUser(registerData).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/kanban']);
      },
      (error) => {
        console.error('Error occurred:', error);
        //TODO: Add error handling!
      }
    );

    this.email = '';
    this.password = '';
    this.rePassword = '';
    this.username = '';
  }
}
