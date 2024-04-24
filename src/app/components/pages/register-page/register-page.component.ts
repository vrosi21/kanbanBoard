import { Component } from '@angular/core';
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

  constructor(private authSvc: AuthService) {}

  submitRegisterData() {
    if (this.password !== this.rePassword) {
      // Passwords don't match, handle error or alert user
      console.error('Passwords do not match');
      return;
    }

    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    // Now you can use the registerData object as needed, for example, send it to the server
    console.log('Register Data:', registerData);

    // Subscribe to the Observable returned by the service method
    this.authSvc.registerUser(registerData).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        // Optionally, handle success response here
      },
      (error) => {
        console.error('Error occurred:', error);
        // Optionally, handle error response here
      }
    );

    // Or if you want to reset the form fields after submission
    this.email = '';
    this.password = '';
    this.rePassword = '';
    this.username = '';
  }
}
