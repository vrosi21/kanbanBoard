import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface RegisterData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  path: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getWorkspaces(userId: string): Observable<any> {
    return this.http.get(this.path + '/workspaces/' + userId).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        return throwError('An error occurred while processing your request.'); // Return a custom error message
      })
    );
  }
}
