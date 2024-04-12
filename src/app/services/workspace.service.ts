import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workspace, WorkspaceInfo } from '../models/board.model';
import { Observable } from 'rxjs';
const apiUrl: string = 'http://localhost:8081/api/workspaces';
@Injectable({
	providedIn: 'root',
})
export class WorkspaceService {
	constructor(private http: HttpClient) {}

	extractWorkspaceInfo(workspaces: Workspace[]): WorkspaceInfo[] {
		return workspaces.map((workspace) => {
			return {
				id: workspace.id,
				title: workspace.title,
			};
		});
	}

	getWorkspaces(): Observable<Workspace[]> {
		return this.http.get<Workspace[]>(apiUrl);
	}
	createNewWorkspace(newWorkspace: Workspace) {
		this.http.post(apiUrl, newWorkspace).subscribe(() => {
			console.log('New workspace added.');
		});
	}
}
