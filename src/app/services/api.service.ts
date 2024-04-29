import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NewWorkspaceTemplateService } from './new-workspace-template.service';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = 'http://localhost:3000/api';
  changedWspId!: ObjectId;
  newWorkspaceCreated = new EventEmitter<ObjectId>();

  constructor(
    private http: HttpClient,
    private workspaceTemplateSvc: NewWorkspaceTemplateService
  ) {}

  saveNewWorkspace(wspTitle: string): Observable<ObjectId> {
    const newWorkspace =
      this.workspaceTemplateSvc.generateNewWorkspace(wspTitle);
    return this.http.post<any>(`${this.apiUrl}/workspace`, newWorkspace).pipe(
      catchError((error) => {
        console.error('Error adding workspace to DB:', error);
        return throwError('An error occurred while adding workspace to DB.');
      })
    );
  }

  async getWorkspaces(): Promise<any> {
    try {
      const workspaces = await this.http
        .get(`${this.apiUrl}/workspaces`)
        .toPromise();

      return workspaces;
    } catch (error) {
      console.error('Error occurred:', error);
      throw new Error('An error occurred while processing your request.');
    }
  }

  renameWorkspace(wspId: ObjectId, newWspTitle: string): Observable<any> {
    const url = `${this.apiUrl}/workspace/${wspId}/rename`;
    const body = { newTitle: newWspTitle };

    return this.http.put<any>(url, body).pipe(
      catchError((error) => {
        console.error('Error renaming workspace:', error);
        return throwError('An error occurred while renaming workspace.');
      })
    );
  }

  deleteWorkspace(wspId: ObjectId): Observable<any> {
    const url = this.apiUrl + '/workspace/' + wspId;
    console.log(url);

    return this.http.delete<any>(url);
  }
}
