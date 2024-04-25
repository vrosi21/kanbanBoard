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
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import Router
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
  faTrashAlt = faTrashAlt;

  newWorkspaceTitle: string = '';

  constructor(private workspaceSvc: WorkspaceService, private router: Router) {}

  deleteWorkspace(workspaceId: string) {
    this.workspaceSvc.deleteWorkspace(workspaceId).subscribe(
      () => {
        console.log(`Workspace with ID ${workspaceId} deleted successfully.`);
        // Remove the deleted workspace from the workspaceInfo array
        if (workspaceId === this.currentWorkspaceId) {
          this.workspaceSvc.fetchData();
          this.currentWorkspaceId = this.workspaceInfo[0].id;
        }

        this.workspaceInfo = this.workspaceInfo.filter(
          (workspace) => workspace.id !== workspaceId
        );
      },
      (error) => {
        console.error('Error deleting workspace:', error);
        // Handle error
      }
    );
  }

  addNewWorkspace() {
    if (this.newWorkspaceTitle.trim() !== '') {
      this.hasError = false; // No error
      this.workspaceSvc.createNewWorkspace(this.newWorkspaceTitle);
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
    this.workspaceSvc.newWorkspaceCreated.subscribe((newWorkspace) => {
      this.workspaceInfo.push({
        id: newWorkspace.id,
        title: newWorkspace.title,
      });
    });
  }
}
