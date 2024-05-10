import { Component, Input } from '@angular/core';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/note.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  trashIcon = faTrashAlt;
  renameIcon = faPencilAlt;
  @Input() note!: Note;

  constructor(public modalSvc: ModalService) {}
}
