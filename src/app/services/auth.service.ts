import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginData, UserData } from '../models/user.model';
import { WorkspaceService } from './workspace.service';
interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = 'http://localhost:3000/auth';
  constructor(
    private http: HttpClient,
    private workspaceSvc: WorkspaceService
  ) {}

  get token() {
    return localStorage.getItem('token');
  }

  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.workspaceSvc.clearCache();
    localStorage.removeItem('token');
  }

  loginUser(loginData: LoginData): Observable<any> {
    return this.http.post(this.authUrl + '/login', loginData).pipe(
      catchError((error) => {
        console.error('Error occurred during user login:', error);
        throw error;
      })
    );
  }

  registerUser(registerData: UserData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.authUrl + '/register', registerData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred:', error);
          return throwError('An error occurred while processing your request.');
        })
      );
  }
}
