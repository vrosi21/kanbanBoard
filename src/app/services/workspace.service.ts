import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workspace, WorkspaceInfo } from '../models/board.model';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { NewWorkspaceTemplateService } from './new-workspace-template.service';

const apiUrl: string = 'http://localhost:8081/api/workspaces';

@Injectable({
	providedIn: 'root',
})
export class WorkspaceService {
	newWorkspaceCreated = new EventEmitter<Workspace>();

	constructor(
		private http: HttpClient,
		private workspaceTemplateSvc: NewWorkspaceTemplateService
	) {}

	generateUniqueId(): string {
		return uuidv4();
	}

	extractWorkspaceInfo(workspaces: Workspace[]): WorkspaceInfo[] {
		return workspaces.map((workspace) => ({
			id: workspace.id,
			title: workspace.title,
		}));
	}

	getWorkspaces(): Observable<Workspace[]> {
		return this.http.get<Workspace[]>(apiUrl);
	}

	createNewWorkspace(newWorkspaceTitle: string, uniqueId: string) {
		const newWorkspace = this.workspaceTemplateSvc.generateNewWorkspace(
			newWorkspaceTitle,
			uniqueId
		);

		this.http.post(apiUrl, newWorkspace).subscribe(
			() => {
				console.log('Added ', newWorkspace.title, ' to DB.');
				this.newWorkspaceCreated.emit(newWorkspace); // Emit event when workspace is created successfully
			},
			(error) => {
				console.error('Error adding workspace to DB:', error);
				// Perform additional error handling here, such as displaying an error message to the user
			}
		);
	}
}
