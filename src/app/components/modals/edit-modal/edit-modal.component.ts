import { Component } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { ModalService } from 'src/app/services/modal.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  newTitle: string = this.modalSvc.objectTitle;
  boardColor: string = this.modalSvc.objectColor || '';
  inputEmptyErr: boolean = false;
  noColorErr: boolean = false;

  constructor(
    private workspaceSvc: WorkspaceService,
    private boardSvc: BoardService,
    public modalSvc: ModalService
  ) {}

  close() {
    this.modalSvc.isOpenEdtMdl = false;
  }

  edit() {
    if (this.newTitle !== '') {
      if (this.modalSvc.objectType == 'workspace') {
        this.workspaceSvc.renameWorkspace(
          this.modalSvc.objectId,
          this.newTitle
        );
      } else if (this.modalSvc.objectType == 'board') {
        if (this.boardColor == '') {
          this.noColorErr = true;
          return;
        }
        this.boardSvc.renameBoard(
          this.modalSvc.objectId,
          this.newTitle,
          this.boardColor
        );
      } else if (this.modalSvc.objectType == 'note') {
      }

      this.close();
    } else {
      this.inputEmptyErr = true;
    }
  }

  onInput() {
    this.inputEmptyErr = this.newTitle.trim() === '';
  }

  onColorSelected(color: string) {
    this.noColorErr = false;
    this.boardColor = color;
  }
}
