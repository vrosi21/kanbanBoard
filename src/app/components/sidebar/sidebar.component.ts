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
import { ApiService } from 'src/app/services/api.service';
import { ObjectId } from 'mongodb';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() workspaceInfo!: WorkspaceInfo[];
  @Input() currentWorkspaceId!: ObjectId;
  @Output() changeWorkspaceEvent = new EventEmitter<ObjectId>();
  hasError: boolean = false;
  faTrashAlt = faTrashAlt;
  newWorkspaceTitle: string = '';

  constructor(
    private workspaceSvc: WorkspaceService,
    private apiSvc: ApiService
  ) {}

  deleteWorkspace() {}
  //   this.workspaceSvc.deleteWorkspace(workspaceId).subscribe(
  //     () => {
  //       console.log(`Workspace with ID ${workspaceId} deleted successfully.`);
  //       // Remove the deleted workspace from the workspaceInfo array
  //       if (workspaceId === this.currentWorkspaceId) {
  //         this.workspaceSvc.fetchData();
  //         //this.currentWorkspaceId = this.workspaceInfo[0].id;
  //       }

  //       // this.workspaceInfo = this.workspaceInfo.filter(
  //       //   (workspace) => workspace.id !== workspaceId
  //       // );
  //     },
  //     (error) => {
  //       console.error('Error deleting workspace:', error);
  //       // Handle error
  //     }
  //   );
  // }

  addNewWorkspace() {
    if (this.newWorkspaceTitle.trim() !== '') {
      this.hasError = false; // No error
      this.apiSvc.createNewWorkspace(this.newWorkspaceTitle);
      this.newWorkspaceTitle = '';
    } else {
      this.hasError = true; // Input is empty, set error flag
    }
  }

  changeWorkspace(wspId: ObjectId) {
    this.currentWorkspaceId = wspId;
    this.changeWorkspaceEvent.emit(wspId);
  }

  isCurrentWorkspace() {
    return '';
  } //(workspaceId: string): string {
  //   if (this.currentWorkspaceId === workspaceId) {
  //     return 'active';
  //   } else {
  //     return '';
  //   }
  // }
  ngOnInit() {
    this.newWorkspaceTitle = '';
    // Subscribe to the event emitted when a new workspace is created
    this.workspaceSvc.newWorkspaceCreated.subscribe((newWorkspace) => {
      this.workspaceInfo.push({
        _id: newWorkspace._id,
        title: newWorkspace.title,
      });
    });
  }
}
