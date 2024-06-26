import { Component } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { ModalService } from 'src/app/services/modal.service';
import { NoteService } from 'src/app/services/note.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  newTitle: string = this.modalSvc.objectTitle;
  description: string = this.modalSvc.objectDescription;
  color: string = this.modalSvc.objectColor || '';
  inputEmptyErr: boolean = false;
  noColorErr: boolean = false;

  constructor(
    private workspaceSvc: WorkspaceService,
    private boardSvc: BoardService,
    private noteSvc: NoteService,
    public modalSvc: ModalService
  ) {}

  close() {
    this.modalSvc.isOpenEdtMdl = false;
  }

  edit() {
    if (this.newTitle == '') {
      this.inputEmptyErr = true;
      return;
    }
    if (this.modalSvc.objectType == 'workspace') {
      this.workspaceSvc.renameWorkspace(this.modalSvc.objectId, this.newTitle);
      this.close();
      return;
    }
    if (this.color == '') {
      this.noColorErr = true;
      return;
    }
    if (this.modalSvc.objectType == 'board') {
      this.boardSvc.renameBoard(
        this.modalSvc.objectId,
        this.newTitle,
        this.color
      );
    } else if (this.modalSvc.objectType == 'note') {
      this.noteSvc.editNote(
        this.modalSvc.objectId,
        this.newTitle,
        this.description,
        this.color
      );
    }

    this.close();
  }

  onInput() {
    this.inputEmptyErr = this.newTitle.trim() === '';
  }

  onColorSelected(color: string) {
    this.noColorErr = false;
    this.color = color;
  }
}
