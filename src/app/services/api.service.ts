import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NewWorkspaceTemplateService } from './new-workspace-template.service';
import { ObjectId } from 'mongodb';
import { WorkspaceService } from './workspace.service';
import { Workspace } from '../models/board.model';

interface RegisterData {
  email: string;
  password: string;
}

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

  deleteWorkspace(wspId: ObjectId): Observable<any> {
    const url = this.apiUrl + '/workspace/' + wspId;
    console.log(url);

    return this.http.delete<any>(url);
  }
}
