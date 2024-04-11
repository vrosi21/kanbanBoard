import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workspace } from '../models/board.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class WorkspaceService {
	constructor(private http: HttpClient) {}

	getWorkspaces(): Observable<Workspace[]> {
		return this.http.get<Workspace[]>('http://localhost:8081/api/workspaces');
	}
}
