import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ObjectId } from 'mongodb';
import { AuthService } from 'src/app/services/auth.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-kanban-page',
  templateUrl: './kanban-page.component.html',
  styleUrls: ['./kanban-page.component.css'],
})
export class KanbanPageComponent implements OnInit {
  constructor(
    public workspaceSvc: WorkspaceService,
    public authSvc: AuthService,
    public boardSvc: BoardService
  ) {}

  async ngOnInit() {
    // Subscribe to the workspaceDeleted event
    // this.workspaceSvc.workspaceDeleted.subscribe(
    //   async (currWspId: ObjectId) => {
    //     // Update variables or perform any necessary actions
    //     // For example, refetch workspaces
    //     // await this.workspaceSvc.fetchWorkspaces();

    //     this.workspaceSvc.currentWorkspace =
    //       this.workspaceSvc.changeWorkspace(currWspId);
    //   }
    // );

    await this.workspaceSvc.fetchWorkspaces();
    // Fetch initial workspaces
    if (!this.workspaceSvc.isTableEmpty) {
      this.workspaceSvc.currentWorkspace = this.workspaceSvc.currentWorkspace;
    } else {
    }
  }
}
