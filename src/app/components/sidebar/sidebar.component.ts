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

  deleteWorkspace(wspId: ObjectId) {
    this.apiSvc.deleteWorkspace(wspId).subscribe(
      () => {
        console.log('Workspace with ID ${wspId} deleted successfully.');
        if (this.currentWorkspaceId === wspId) {
          this.workspaceSvc.fetchData();
          this.currentWorkspaceId = this.workspaceInfo[0]._id;
        }
        this.workspaceInfo = this.workspaceInfo.filter(
          (wsp) => wsp._id !== wspId
        );
      },
      (error) => {
        console.error('Error deleting workspace:', error);
        //TODO: Handle error.
      }
    );
  }

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

  isCurrentWorkspace(wspId: ObjectId) {
    if (this.currentWorkspaceId === wspId) return 'active';
    else return '';
  }

  ngOnInit() {
    this.newWorkspaceTitle = '';
  }
}
