import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ObjectId } from 'mongodb';

export class ApiService<T> {
  protected url = 'http://localhost:3000';
  protected constructor(protected http: HttpClient, protected path: string) {}

  protected handleError(error: any): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      console.error(
        `Backend returned code ${error.status}, ` +
          `${error.error.name}: ${error.error.message}`
      );
    } else {
      console.error('An unexpected error occurred:', error);
    }
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
