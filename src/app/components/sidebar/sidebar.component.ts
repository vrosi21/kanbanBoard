import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workspace } from 'src/app/models/board.model';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	@Input() workspaces!: Workspace[];
	@Output() changeWorkspaceEvent = new EventEmitter<Workspace>();
	sidebarOpen: boolean = true;

	changeWorkspace(workspace: Workspace) {
		this.changeWorkspaceEvent.emit(workspace);
	}
}