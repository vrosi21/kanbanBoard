import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { ModalService } from 'src/app/services/modal.service';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { ObjectId } from 'mongodb';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  notes: Note[] = [];
  trashIcon = faTrashAlt;
  renameIcon = faPencilAlt;
  addIcon = faSquarePlus;
  @Input() board!: Board;

  constructor(public modalSvc: ModalService, private noteSvc: NoteService) {}

  ngOnInit(): void {
    this.noteSvc.newNoteAdded.subscribe(async (currBrdId: ObjectId) => {
      if (this.board._id == currBrdId) await this.fetchNotes(currBrdId);
    });
    this.noteSvc.noteDeleted.subscribe(async (currBrdId: ObjectId) => {
      if (this.board._id == currBrdId) await this.fetchNotes(currBrdId);
    });
    this.noteSvc.noteEdited.subscribe(async (currBrdId: ObjectId) => {
      if (this.board._id == currBrdId) await this.fetchNotes(currBrdId);
    });
    this.fetchNotes(this.board._id);
  }

  async fetchNotes(brdId?: ObjectId) {
    const path = `?parent=${brdId}`;
    const notes = await this.noteSvc.get(path);
    this.notes = notes || [];
    if (notes.length) console.log(notes);
  }
}
