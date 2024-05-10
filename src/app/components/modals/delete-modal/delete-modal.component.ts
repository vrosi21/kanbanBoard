import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { ModalService } from 'src/app/services/modal.service';
import { NoteService } from 'src/app/services/note.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  constructor(
    private workspaceService: WorkspaceService,
    private boardService: BoardService,
    private noteSvc: NoteService,
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
      this.noteSvc.deleteNote(this.modalSvc.objectId, this.modalSvc.parent);
    }

    this.close();
  }

  ngOnInit() {}
}
