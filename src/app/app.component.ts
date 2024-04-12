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
	workspaceInfo!: WorkspaceInfo[];
	constructor(private workspaceSvc: WorkspaceService) {}
	changeWorkspace(workspace: Workspace) {
		this.currentWorkspace = workspace;
		console.log(workspace);
	}
	ngOnInit() {
		this.workspaceSvc.getWorkspaces().subscribe((workspaces) => {
			this.workspaces = workspaces;
			this.currentWorkspace = this.workspaces[0];
			//extract title and id from workspaces
			this.workspaceInfo = this.workspaceSvc.extractWorkspaceInfo(
				this.workspaces
			);
		});
	}
}
