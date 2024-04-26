import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { Workspace } from 'src/app/models/board.model';
import { ObjectId } from 'mongodb';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-kanban-page',
  templateUrl: './kanban-page.component.html',
  styleUrls: ['./kanban-page.component.css'],
})
export class KanbanPageComponent implements OnInit {
  currentWorkspace!: Workspace;

  constructor(
    private workspaceSvc: WorkspaceService,
    public authSvc: AuthService
  ) {}

  changeWorkspace(wspId: ObjectId) {
    this.currentWorkspace = this.workspaceSvc.changeWorkspace(wspId);
  }
  addBoard() {}

  async ngOnInit() {
    // Subscribe to the workspaceDeleted event
    this.workspaceSvc.workspaceDeleted.subscribe(
      async (currWspId: ObjectId) => {
        // Update variables or perform any necessary actions
        // For example, refetch workspaces
        // await this.workspaceSvc.fetchWorkspaces();
        this.currentWorkspace = this.workspaceSvc.changeWorkspace(currWspId);
      }
    );

    // Fetch initial workspaces
    await this.workspaceSvc.fetchWorkspaces();
    this.currentWorkspace = this.workspaceSvc.currentWsp;
  }
}
