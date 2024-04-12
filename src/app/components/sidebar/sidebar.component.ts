import {
	Component,
	EventEmitter,
	Input,
	Output,
	OnInit,
	NgModule,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Workspace } from 'src/app/models/board.model';
import { WorkspaceService } from 'src/app/services/workspace.service';
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
	newWorkspaceTitle: string = '';

	constructor(private workspaceService: WorkspaceService) {}
	// Assuming Workspace and isCurrentWorkspace methods are defined elsewhere

	addNewWorkspace() {
		if (this.newWorkspaceTitle.trim() !== '') {
			const newWorkspace: Workspace = {
				id: this.workspaces.length + 1,
				title: this.newWorkspaceTitle.trim(),
				arrayOfBoards: [
					{
						id: 1,
						title: 'Archived',
						colour: '#808080', // Grey color
						arrayOfNotes: [], // No notes
					},
					{
						id: 2,
						title: 'To do',
						colour: '#FF6347', // Tomato color
						arrayOfNotes: [], // No notes
					},
					{
						id: 3,
						title: 'Doing',
						colour: '#FFD700', // Gold color
						arrayOfNotes: [], // No notes
					},
					{
						id: 4,
						title: 'Done',
						colour: '#32CD32', // Lime green color
						arrayOfNotes: [], // No notes
					},
				],
			};
			this.workspaceService.createNewWorkspace(newWorkspace);
			this.workspaces.push(newWorkspace);
			console.log(this.workspaces);

			this.newWorkspaceTitle = ''; // Clear input after adding workspace
		}
	}

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
