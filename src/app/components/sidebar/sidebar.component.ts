import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Workspace } from 'src/app/models/board.model';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
	@Input() workspaces!: Workspace[];
	@Input() currentWorkspace!: Workspace;
	@Output() changeWorkspaceEvent = new EventEmitter<Workspace>();
	sidebarOpen: boolean = true;

	changeWorkspace(workspace: Workspace) {
		this.changeWorkspaceEvent.emit(workspace);
	}
	isCurrentWorkspace(workspace: Workspace) {
		if (workspace === this.currentWorkspace) {
			return 'active';
		} else {
			return '';
		}
	}
	ngOnInit() {
		console.log(this.workspaces);
	}
}
