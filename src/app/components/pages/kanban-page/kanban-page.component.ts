import { Component, OnInit } from '@angular/core';
import { identifierName } from '@angular/compiler';
import { WorkspaceService } from 'src/app/services/workspace.service';
import {
	Board,
	Note,
	Workspace,
	WorkspaceInfo,
} from 'src/app/models/board.model';

@Component({
	selector: 'app-kanban-page',
	templateUrl: './kanban-page.component.html',
	styleUrls: ['./kanban-page.component.css'],
})
export class KanbanPageComponent implements OnInit {
	workspaces!: Workspace[];
	currentWorkspace!: Workspace;
	currentWorkspaceId!: string;
	workspaceInfo: WorkspaceInfo[] = []; // Explicitly typed as an array of WorkspaceInfo

	constructor(private workspaceSvc: WorkspaceService) {}

	changeWorkspace(workspaceId: string) {
		const foundWorkspace = this.workspaces.find(
			(workspace: Workspace) => workspace.id === workspaceId
		);
		if (foundWorkspace) {
			this.currentWorkspace = foundWorkspace;
			console.log(this.currentWorkspace);
		} else {
			console.error('Workspace not found for id:', workspaceId);
		}
	}
	addBoard() {}

	ngOnInit() {
		this.fetchData(); // Call fetchData method on component initialization

		this.workspaceSvc.fetchDataSubject.subscribe(() => {
			this.fetchData();
		});
	}

	fetchData() {
		this.workspaceSvc.getWorkspaces().subscribe((workspaces) => {
			this.workspaces = workspaces;
			this.currentWorkspace = this.workspaces[0];
			this.currentWorkspaceId = this.currentWorkspace.id;
			this.workspaceInfo = this.workspaceSvc.extractWorkspaceInfo(workspaces);
		});

		// Subscribe to the event emitted when a new workspace is created
		this.workspaceSvc.newWorkspaceCreated.subscribe(
			(newWorkspace: Workspace) => {
				this.workspaces.push(newWorkspace);
				this.currentWorkspace = newWorkspace;
				this.currentWorkspaceId = newWorkspace.id;
			}
		);
	}
}
