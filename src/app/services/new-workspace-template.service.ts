import { Injectable } from '@angular/core';
import { Workspace } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class NewWorkspaceTemplateService {
  constructor() {}

  generateNewWorkspace(workspaceTitle: string) {
    const newWorkspace = {
      title: workspaceTitle.trim(),
      arrayOfBoards: [
        {
          title: 'Archived',
          colour: '#808080', // Grey color
          arrayOfNotes: [], // No notes
        },
        {
          title: 'To do',
          colour: '#FF6347', // Tomato color
          arrayOfNotes: [], // No notes
        },
        {
          title: 'Doing',
          colour: '#FFD700', // Gold color
          arrayOfNotes: [], // No notes
        },
        {
          title: 'Done',
          colour: '#32CD32', // Lime green color
          arrayOfNotes: [], // No notes
        },
      ],
    };
    return newWorkspace;
  }
}
