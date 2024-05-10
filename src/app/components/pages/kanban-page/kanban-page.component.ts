import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BoardService } from 'src/app/services/board.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-kanban-page',
  templateUrl: './kanban-page.component.html',
  styleUrls: ['./kanban-page.component.scss'],
})
export class KanbanPageComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  addIcon = faSquarePlus;
  constructor(
    public workspaceSvc: WorkspaceService,
    public authSvc: AuthService,
    public boardSvc: BoardService,
    public modalSvc: ModalService
  ) {}

  async ngOnInit() {
    await this.workspaceSvc.fetchWorkspaces();
    if (!this.workspaceSvc.isTableEmpty) {
      this.workspaceSvc.currentWorkspace = this.workspaceSvc.currentWorkspace;
    } else {
    }
  }
}
