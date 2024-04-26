import { Component, OnInit } from '@angular/core';
import { identifierName } from '@angular/compiler';
import { WorkspaceService } from 'src/app/services/workspace.service';
import {
  Board,
  Note,
  Workspace,
  WorkspaceInfo,
} from 'src/app/models/board.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectId } from 'mongodb';

@Component({
  selector: 'app-kanban-page',
  templateUrl: './kanban-page.component.html',
  styleUrls: ['./kanban-page.component.css'],
})
export class KanbanPageComponent implements OnInit {
  workspaces!: Workspace[];
  currentWorkspace!: Workspace;
  currentWorkspaceId!: ObjectId;
  workspaceInfo: WorkspaceInfo[] = [];

  constructor(
    private workspaceSvc: WorkspaceService,
    private apiSvc: ApiService,
    public authSvc: AuthService
  ) {}

  changeWorkspace(wspId: ObjectId) {
    const foundWorkspace = this.workspaces.find(
      (workspace: Workspace) => workspace._id === wspId
    );
    if (foundWorkspace) {
      this.currentWorkspace = foundWorkspace;
    } else {
      console.error('Workspace not found for id:', wspId);
    }
  }
  addBoard() {}

  ngOnInit() {
    this.fetchData(); // Call fetchData method on component initialization

    this.workspaceSvc.fetchDataSubject.subscribe(() => {
      this.fetchData();
    });
  }

  fetchData() {
    this.apiSvc.getWorkspaces().subscribe((workspaces) => {
      console.log(workspaces);

      this.workspaces = workspaces;

      this.currentWorkspace = this.workspaces[0];
      this.currentWorkspaceId = this.currentWorkspace._id;
      this.workspaceInfo = this.workspaceSvc.extractWorkspaceInfo(workspaces);
    });

    // this.workspaceSvc.getWorkspaces().subscribe((workspaces) => {
    //   this.workspaces = workspaces;
    //   this.currentWorkspace = this.workspaces[0];
    //   this.currentWorkspaceId = this.currentWorkspace.id;
    //   this.workspaceInfo = this.workspaceSvc.extractWorkspaceInfo(workspaces);
    // });

    // // Subscribe to the event emitted when a new workspace is created
    // this.workspaceSvc.newWorkspaceCreated.subscribe(
    //   (newWorkspace: Workspace) => {
    //     this.workspaces.push(newWorkspace);
    //     this.currentWorkspace = newWorkspace;
    //     this.currentWorkspaceId = newWorkspace.id;
    //   }
    // );
  }
}
