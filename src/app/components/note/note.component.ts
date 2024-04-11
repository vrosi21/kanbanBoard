import { Component, Input } from '@angular/core';
import { Note } from 'src/app/models/board.model';

@Component({
	selector: 'app-note',
	templateUrl: './note.component.html',
	styleUrls: ['./note.component.css'],
})
export class NoteComponent {
	@Input() note!: Note;
}
