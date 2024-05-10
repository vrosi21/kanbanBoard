import { Component, Input } from '@angular/core';
import { ObjectId } from 'mongodb';
import { BoardService } from 'src/app/services/board.service';
import { ModalService } from 'src/app/services/modal.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent {
  newTitle: string = '';
  description: string = '';
  color: string = '';
  inputEmptyErr: boolean = false;
  noColorErr: boolean = false;
  @Input() currentWorkspaceId?: ObjectId;

  constructor(
    private boardSvc: BoardService,
    private noteSvc: NoteService,
    public modalSvc: ModalService
  ) {}

  close() {
    this.modalSvc.isOpenCreateMdl = false;
  }

  createNew() {
    if (this.newTitle == '') {
      this.inputEmptyErr = true;
      if (this.color == '') {
        this.noColorErr = true;
      }
      return;
    } else if (this.color == '') {
      this.noColorErr = true;
      return;
    }
    this.inputEmptyErr = false;
    if (this.modalSvc.objectType == 'board') {
      this.boardSvc.createNewBoard(
        this.newTitle,
        this.color,
        this.modalSvc.parent
      );
    } else if (this.modalSvc.objectType == 'note') {
      this.noteSvc.createNewNote(
        this.newTitle,
        this.description,
        this.color,
        this.modalSvc.parent
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
