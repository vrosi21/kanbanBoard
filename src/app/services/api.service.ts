import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ObjectId } from 'mongodb';

export class ApiService<T> {
  protected url = 'http://localhost:3000';
  protected constructor(protected http: HttpClient, protected path: string) {}

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
      if (error.error && error.error.error) {
        return throwError(error.error.error);
      }
    }
    // If there's no specific error message in the response body, return a generic error message
    return throwError('Something bad happened; please try again later.');
  }

  async get(path?: string): Promise<any> {
    try {
      const data = await this.http
        .get(this.url + this.path + (path || ''))
        .toPromise();

      return data;
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  post(data: T): Observable<any> {
    return this.http
      .post(this.url + this.path, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: ObjectId): Observable<any> {
    return this.http.delete(this.url + this.path + id);
  }

  put(id: ObjectId, data: T): Observable<any> {
    console.log('put', data);
    return this.http
      .put(this.url + this.path + id, data)
      .pipe(catchError(this.handleError));
  }

  deleteByParent(deleteUrl: string): Observable<any> {
    return this.http.delete(deleteUrl).pipe(catchError(this.handleError));
  }
}
