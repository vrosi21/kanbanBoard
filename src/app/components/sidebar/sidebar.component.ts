import {
	Component,
	EventEmitter,
	Input,
	Output,
	OnInit,
	NgModule,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Workspace, WorkspaceInfo } from 'src/app/models/board.model';
import { WorkspaceService } from 'src/app/services/workspace.service';
@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
	@Input() workspaceInfo!: WorkspaceInfo[];
	@Input() currentWorkspaceId!: string;
	@Output() changeWorkspaceEvent = new EventEmitter<string>();
	hasError: boolean = false;

	newWorkspaceTitle: string = '';

	constructor(private workspaceSvc: WorkspaceService) {}

	addNewWorkspace() {
		if (this.newWorkspaceTitle.trim() !== '') {
			this.hasError = false; // No error
			this.workspaceSvc.createNewWorkspace(
				this.newWorkspaceTitle,
				this.workspaceSvc.generateUniqueId()
			);
			this.newWorkspaceTitle = '';
		} else {
			this.hasError = true; // Input is empty, set error flag
		}
	}

	changeWorkspace(workspaceId: string) {
		this.currentWorkspaceId = workspaceId;
		this.changeWorkspaceEvent.emit(workspaceId);
	}

	// Reset error flag when the input field receives focus
	onInputFocus() {
		this.hasError = false;
	}

	isCurrentWorkspace(workspaceId: string): string {
		if (this.currentWorkspaceId === workspaceId) {
			return 'active';
		} else {
			return '';
		}
	}
	ngOnInit() {
		// Subscribe to the event emitted when a new workspace is created
		this.workspaceSvc.newWorkspaceCreated.subscribe(
			(newWorkspace: Workspace) => {
				this.workspaceInfo.push({
					id: newWorkspace.id,
					title: newWorkspace.title,
				});
			}
		);
	}
}
