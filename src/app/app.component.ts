import { Component, OnInit } from '@angular/core';
import { Board, Note, Workspace, WorkspaceInfo } from './models/board.model';
import { identifierName } from '@angular/compiler';
import { WorkspaceService } from './services/workspace.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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

	ngOnInit() {
		this.workspaceSvc.getWorkspaces().subscribe((workspaces) => {
			this.workspaces = workspaces;
			this.currentWorkspace = this.workspaces[0];
			this.currentWorkspaceId = this.currentWorkspace.id;
			this.workspaceInfo = this.workspaceSvc.extractWorkspaceInfo(workspaces);
		});

		// Subscribe to the event emitted when a new workspace is created
		this.workspaceSvc.newWorkspaceCreated.subscribe(
			(newWorkspace: Workspace) => {
				this.workspaces.push(newWorkspace); // Add new workspace to the list
				this.currentWorkspace = newWorkspace; // Set new workspace as the current workspace
				this.currentWorkspaceId = newWorkspace.id;
			}
		);
	}
}
