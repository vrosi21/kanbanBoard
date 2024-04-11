import { Component } from '@angular/core';
import { Board, Note, Workspace } from './models/board.model';
import { identifierName } from '@angular/compiler';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	boards: Board[];
	note1: Note;
	note2: Note;
	workspace1: Workspace;
	workspace2: Workspace;
	workspaces!: Workspace[];
	currentWorkspace!: Workspace;
	constructor() {
		this.note1 = {
			id: 1,
			description: 'desc1',
			colour: 'blue',
			created: 'today',
			reminder: 'tommorrow',
		};
		this.note2 = {
			id: 2,
			description: 'desc2',
			colour: 'red',
			created: 'today',
			reminder: 'tommorrow',
		};
		this.boards = [
			{
				id: 2,
				title: 'board02',
				colour: 'blue',
				arrayOfNotes: [this.note1, this.note2],
			},
			{
				id: 1,
				title: 'board01',
				colour: 'red',
				arrayOfNotes: [this.note1, this.note1],
			},
		];
		this.workspace1 = {
			id: 1,
			title: 'workspace1',
			arrayOfBoards: this.boards,
		};
		this.workspace2 = {
			id: 2,
			title: 'workspace2',
			arrayOfBoards: this.boards,
		};
		this.workspaces = [this.workspace1, this.workspace2];
	}
	changeWorkspace(workspace: Workspace) {
		this.currentWorkspace = workspace;
		console.log(workspace);
	}
}
