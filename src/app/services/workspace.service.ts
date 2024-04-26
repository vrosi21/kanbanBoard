import { EventEmitter, Injectable } from '@angular/core';
import { Workspace, WorkspaceInfo } from '../models/board.model';
import { Observable, Subject } from 'rxjs';
import { ObjectId } from 'mongodb';
import { ApiService } from './api.service';

const apiUrl: string = 'http://localhost:8081/api/workspaces';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  workspaces!: Workspace[];
  currentWorkspace!: Workspace;
  currentWorkspaceId!: ObjectId;
  workspaceInfo!: WorkspaceInfo[];

  constructor(private apiSvc: ApiService) {}

  extractWorkspaceInfo(workspaces: Workspace[]): WorkspaceInfo[] {
    return workspaces.map((workspace) => ({
      _id: workspace._id,
      title: workspace.title,
    }));
  }
  get currentWsp(): Workspace {
    return this.currentWorkspace;
  }

  get wspInfo(): WorkspaceInfo[] {
    return this.workspaceInfo;
  }
  get currentWspId(): ObjectId {
    return this.currentWorkspaceId;
  }

  createNewWorkspace(wspTitle: string): void {
    this.apiSvc.saveNewWorkspace(wspTitle).subscribe(
      (res: any) => {
        console.log('Added new workspace with ID:', res._id);

        this.currentWorkspaceId = res._id;

        this.newWorkspaceAdded.emit(this.currentWorkspaceId);
      },
      (error) => {
        console.error('Error creating new workspace:', error);
        // Handle error accordingly
      }
    );
  }
  newWorkspaceAdded: EventEmitter<ObjectId> = new EventEmitter<ObjectId>();

  deleteWorkspace(wspId: ObjectId) {
    this.apiSvc.deleteWorkspace(wspId).subscribe(
      () => {
        if (this.currentWorkspaceId === wspId) {
          this.workspaces = this.workspaces.filter((wsp) => wsp._id !== wspId);
          this.currentWorkspace = this.workspaces[0];
          this.currentWorkspaceId = this.currentWorkspace._id;
        }
        this.workspaceInfo = this.workspaceInfo.filter(
          (wsp) => wsp._id !== wspId
        );
        // Emit an event after deleting workspace
        this.workspaceDeleted.emit(this.currentWorkspaceId);
      },
      (error) => {
        console.error('Error deleting workspace:', error);
        //TODO: Handle error.
      }
    );
  }
  workspaceDeleted: EventEmitter<ObjectId> = new EventEmitter<ObjectId>();

  async fetchWorkspaces() {
    try {
      const workspaces = await this.apiSvc.getWorkspaces();
      this.workspaces = workspaces;
      this.currentWorkspace = this.workspaces[0];
      this.currentWorkspaceId = this.currentWorkspace._id;
      this.workspaceInfo = this.extractWorkspaceInfo(workspaces);
      console.log(workspaces);
      console.log(this.workspaceInfo);
    } catch (error) {
      console.error('Error occurred while fetching workspaces:', error);
      // Handle the error appropriately
    }
  }

  changeWorkspace(wspId: ObjectId): Workspace {
    const foundWorkspace = this.workspaces.find((wsp) => wsp._id === wspId);
    if (foundWorkspace) {
      this.currentWorkspace = foundWorkspace;
      this.currentWorkspaceId = this.currentWorkspace._id;
    } else {
      console.error(`Workspace with ID ${wspId} not found.`);
    }
    return this.currentWorkspace;
  }
}
