import { EventEmitter, Injectable } from '@angular/core';
import { Workspace } from '../models/workspace.model';
import { ObjectId } from 'mongodb';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService extends ApiService<Workspace> {
  workspaces!: Workspace[];
  currentWorkspace?: Workspace;
  currentWorkspaceId?: ObjectId;
  isTableEmpty!: boolean;

  newWorkspaceAdded: EventEmitter<ObjectId> = new EventEmitter<ObjectId>();

  constructor(http: HttpClient, private boardSvc: BoardService) {
    super(http, '/workspaces/');
  }

  createNewWorkspace(wspTitle: string): void {
    const newWorkspace: Workspace = { title: wspTitle };
    this.post(newWorkspace).subscribe(
      (res: any) => {
        console.log('Added new workspace with ID:', res.workspace._id);
        this.isTableEmpty = false;
        this.currentWorkspaceId = res.workspace._id;
        this.newWorkspaceAdded.emit(this.currentWorkspaceId);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  renameWorkspace(wspId: ObjectId, newTitle: string) {
    const renamedWorkspace: Workspace = { _id: wspId, title: newTitle };
    this.put(wspId, renamedWorkspace).subscribe(
      () => {
        console.log(
          'Workspace with id: ',
          wspId,
          'renamed to ',
          renamedWorkspace.title,
          ' successfully.'
        );
        this.fetchWorkspaces();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  deleteWorkspace(wspId: ObjectId) {
    this.delete(wspId)
      .pipe(
        mergeMap(() => {
          // Remove the deleted workspace from the workspaces array
          this.workspaces = this.workspaces.filter((wsp) => wsp._id !== wspId);

          if (this.workspaces.length > 0) {
            // Update currentWorkspace and currentWorkspaceId if workspaces array is not empty
            if (this.currentWorkspaceId === wspId) {
              this.fetchWorkspaces();
              this.currentWorkspace = this.workspaces[0];
              this.currentWorkspaceId = this.currentWorkspace._id;
            }
          } else {
            this.isTableEmpty = true;
            this.currentWorkspace = undefined;
            this.currentWorkspaceId = undefined;
          }

          const deleteUrl = `${this.url}/boards?parent=${wspId}`;
          return this.deleteByParent(deleteUrl);
        })
      )
      .subscribe(
        () => {
          // Success callback if the deleteByParent request is successful
          console.log('Delete operation completed successfully.');
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  async fetchWorkspaces() {
    const workspaces = await this.get();
    this.workspaces = workspaces || [];
    if (this.workspaces.length > 0) {
      this.isTableEmpty = false;

      this.currentWorkspace = this.workspaces[0];
      this.currentWorkspaceId = this.currentWorkspace._id;
      this.boardSvc.fetchBoards(this.currentWorkspaceId);
    } else {
      this.isTableEmpty = true;
    }
  }

  changeWorkspace(wspId: ObjectId): Workspace | undefined {
    const foundWorkspace = this.workspaces.find((wsp) => wsp._id === wspId);
    if (foundWorkspace) {
      this.currentWorkspace = foundWorkspace;
      this.currentWorkspaceId = this.currentWorkspace._id;

      this.boardSvc.fetchBoards(this.currentWorkspaceId);
    } else {
      console.error(`Workspace with ID ${wspId} not found.`);
    }
    return this.currentWorkspace;
  }

  clearCache() {
    this.workspaces = [];
    this.currentWorkspace = undefined;
    this.currentWorkspaceId = undefined;
    this.isTableEmpty = false;

    this.boardSvc.clearCache();
  }
}
