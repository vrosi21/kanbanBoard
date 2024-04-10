import { Component } from '@angular/core';
import { Board, Note } from './models/board.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	board01: Board;
	note1: Note;
	constructor() {
		this.note1 = {
			id: 2,
			description: 'desc1',
			colour: 'blue',
			created: 'today',
			reminder: 'tommorrow',
		};
		this.board01 = {
			id: 1,
			title: 'board01',
			colour: 'red',
			arrayOfNotes: [this.note1],
		};
	}
}
