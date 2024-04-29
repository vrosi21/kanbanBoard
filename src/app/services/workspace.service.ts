import { EventEmitter, Injectable } from '@angular/core';
import { Workspace, WorkspaceInfo } from '../models/board.model';
import { ObjectId } from 'mongodb';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  workspaces!: Workspace[];
  currentWorkspace?: Workspace;
  currentWorkspaceId?: ObjectId;
  workspaceInfo!: WorkspaceInfo[];
  isTableEmpty!: boolean;

  constructor(private apiSvc: ApiService) {}

  extractWorkspaceInfo(workspaces: Workspace[]): WorkspaceInfo[] {
    return workspaces.map((workspace) => ({
      _id: workspace._id,
      title: workspace.title,
    }));
  }

  createNewWorkspace(wspTitle: string): void {
    this.apiSvc.saveNewWorkspace(wspTitle).subscribe(
      (res: any) => {
        console.log('Added new workspace with ID:', res._id);

        this.currentWorkspaceId = res._id;

        this.newWorkspaceAdded.emit(this.currentWorkspaceId);
      },
      (error) => {
        this.handleHttpError(error);
      }
    );
  }

  newWorkspaceAdded: EventEmitter<ObjectId> = new EventEmitter<ObjectId>();

  renameWorkspace(wspId: ObjectId, newTitle: string) {
    this.apiSvc.renameWorkspace(wspId, newTitle).subscribe(
      () => {
        // Find the workspace in your application's data and update its title
        const workspaceToUpdate = this.workspaceInfo.find(
          (workspace) => workspace._id === wspId
        );
        if (workspaceToUpdate) {
          workspaceToUpdate.title = newTitle;
        } else {
          console.error('Workspace not found in application data.');
        }
      },
      (error) => {
        this.handleHttpError(error);
      }
    );
  }

  deleteWorkspace(wspId: ObjectId) {
    this.apiSvc.deleteWorkspace(wspId).subscribe(
      () => {
        // Remove the deleted workspace from the workspaces array
        this.workspaces = this.workspaces.filter((wsp) => wsp._id !== wspId);

        if (this.workspaces.length > 0) {
          // Update currentWorkspace and currentWorkspaceId if workspaces array is not empty
          if (this.currentWorkspaceId === wspId) {
            this.currentWorkspace = this.workspaces[0];
            this.currentWorkspaceId = this.currentWorkspace._id;
          }

          // Update workspaceInfo to remove the deleted workspace
          this.workspaceInfo = this.workspaceInfo.filter(
            (wsp) => wsp._id !== wspId
          );
        } else {
          this.isTableEmpty = true;
          // If workspaces array is empty, reset currentWorkspace and currentWorkspaceId
          this.currentWorkspace = undefined;
          this.currentWorkspaceId = undefined;

          // Clear workspaceInfo
          this.workspaceInfo = [];
        }
      },
      (error) => {
        this.handleHttpError(error);
      }
    );
  }

  async fetchWorkspaces() {
    try {
      const workspaces = await this.apiSvc.getWorkspaces();
      this.workspaces = workspaces || []; // Initialize to an empty array if workspaces is undefined
      if (this.workspaces.length > 0) {
        this.currentWorkspace = this.workspaces[0];
        this.currentWorkspaceId = this.currentWorkspace._id;
        this.workspaceInfo = this.extractWorkspaceInfo(workspaces);
        console.log(workspaces);
        console.log(this.workspaceInfo);
      } else {
        this.isTableEmpty = true;
      }
    } catch (error) {
      this.handleHttpError(error);
    }
  }

  changeWorkspace(wspId: ObjectId): Workspace | undefined {
    const foundWorkspace = this.workspaces.find((wsp) => wsp._id === wspId);
    if (foundWorkspace) {
      this.currentWorkspace = foundWorkspace;
      this.currentWorkspaceId = this.currentWorkspace._id;
    } else {
      console.error(`Workspace with ID ${wspId} not found.`);
    }
    return this.currentWorkspace;
  }

  private handleHttpError(error: any) {
    console.error('HTTP error occurred:', error);
    if (error instanceof HttpErrorResponse) {
      if (error.status === 404) {
        console.error('Workspace not found.');
      } else {
        console.error('An unexpected HTTP error occurred.');
      }
    } else {
      console.error('An unexpected error occurred.');
    }
  }
}
