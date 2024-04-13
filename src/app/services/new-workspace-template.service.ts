import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Workspace } from '../models/board.model';

@Injectable({
	providedIn: 'root',
})
export class NewWorkspaceTemplateService {
	constructor() {}

	generateNewWorkspace(workspaceTitle: string, uniqueId: string): Workspace {
		const newWorkspace: Workspace = {
			id: uniqueId,
			title: workspaceTitle.trim(),
			arrayOfBoards: [
				{
					id: this.generateUniqueId(),
					title: 'Archived',
					colour: '#808080', // Grey color
					arrayOfNotes: [], // No notes
				},
				{
					id: this.generateUniqueId(),
					title: 'To do',
					colour: '#FF6347', // Tomato color
					arrayOfNotes: [], // No notes
				},
				{
					id: this.generateUniqueId(),
					title: 'Doing',
					colour: '#FFD700', // Gold color
					arrayOfNotes: [], // No notes
				},
				{
					id: this.generateUniqueId(),
					title: 'Done',
					colour: '#32CD32', // Lime green color
					arrayOfNotes: [], // No notes
				},
			],
		};
		return newWorkspace;
	}
	generateUniqueId(): string {
		return uuidv4();
	}
}
