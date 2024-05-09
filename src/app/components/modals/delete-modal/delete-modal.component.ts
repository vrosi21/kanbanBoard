import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { ModalService } from 'src/app/services/modal.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  constructor(
    public workspaceService: WorkspaceService,
    public boardService: BoardService,
    public modalSvc: ModalService
  ) {}

  close() {
    this.modalSvc.isOpenDltMdl = false;
  }

  deleteObject() {
    if (this.modalSvc.objectType == 'workspace') {
      this.workspaceService.deleteWorkspace(this.modalSvc.objectId);
    } else if (this.modalSvc.objectType == 'board') {
      this.boardService.deleteBoard(this.modalSvc.objectId);
    } else if (this.modalSvc.objectType == 'note') {
    }

    this.close();
  }

  ngOnInit() {}
}
