import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NewWorkspaceTemplateService } from './new-workspace-template.service';

interface RegisterData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  path: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private workspaceTemplateSvc: NewWorkspaceTemplateService
  ) {}

  createNewWorkspace(wspTitle: string) {
    const newWorkspace =
      this.workspaceTemplateSvc.generateNewWorkspace(wspTitle);

    this.http.post(this.path + '/workspace', newWorkspace).subscribe(
      () => {
        console.log('Added ', newWorkspace.title, ' to DB.');
        //this.newWorkspaceCreated.emit(newWorkspace); // Emit event when workspace is created successfully
      },
      (error) => {
        console.error('Error adding workspace to DB:', error);
        // Perform additional error handling here, such as displaying an error message to the user
      }
    );
  }

  getWorkspaces(): Observable<any> {
    return this.http.get(this.path + '/workspaces').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        return throwError('An error occurred while processing your request.');
      })
    );
  }
}
