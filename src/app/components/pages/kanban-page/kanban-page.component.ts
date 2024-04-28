import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-kanban-page',
  templateUrl: './kanban-page.component.html',
  styleUrls: ['./kanban-page.component.scss'],
})
export class KanbanPageComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  constructor(
    public workspaceSvc: WorkspaceService,
    public authSvc: AuthService,
    public boardSvc: BoardService
  ) {}

  async ngOnInit() {
    await this.workspaceSvc.fetchWorkspaces();
    if (!this.workspaceSvc.isTableEmpty) {
      this.workspaceSvc.currentWorkspace = this.workspaceSvc.currentWorkspace;
    } else {
    }
  }
}
