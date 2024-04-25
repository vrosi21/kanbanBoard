import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginData, UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  path: string = 'http://localhost:3000/auth';
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token');
  }

  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  loginUser(loginData: LoginData): Observable<any> {
    return this.http.post(this.path + '/login', loginData).pipe(
      catchError((error) => {
        console.error('Error occurred during user login:', error);
        throw error;
      })
    );
  }

  registerUser(registerData: UserData): Observable<any> {
    return this.http
      .post(this.path + '/register', registerData, {
        responseType: 'text',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred:', error);
          return throwError('An error occurred while processing your request.'); // Return a custom error message
        })
      );
  }
}
