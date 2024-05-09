import { Component, Input } from '@angular/core';
import { ObjectId } from 'mongodb';
import { BoardService } from 'src/app/services/board.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board-modal.component.html',
  styleUrls: ['./new-board-modal.component.scss'],
})
export class NewBoardModalComponent {
  newTitle: string = '';
  boardColor: string = '';
  inputEmptyErr: boolean = false;
  noColorErr: boolean = false;
  @Input() currentWorkspaceId?: ObjectId;

  constructor(private boardSvc: BoardService, public modalSvc: ModalService) {}

  close() {
    this.modalSvc.isOpenNewBrdMdl = false;
  }

  createNewBoard() {
    if (this.newTitle == '') {
      this.inputEmptyErr = true;
      if (this.boardColor == '') {
        this.noColorErr = true;
      }
      return;
    } else if (this.boardColor == '') {
      this.noColorErr = true;
      return;
    } else {
      this.inputEmptyErr = false;
      this.boardSvc.createNewBoard(
        this.newTitle,
        this.boardColor,
        this.currentWorkspaceId
      );
      this.close();
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
