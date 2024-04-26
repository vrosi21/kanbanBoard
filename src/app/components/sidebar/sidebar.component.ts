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
  workspaceInfo!: WorkspaceInfo[];
  currentWorkspaceId!: ObjectId;
  @Output() changeWorkspaceEvent = new EventEmitter<ObjectId>();
  hasError: boolean = false;
  faTrashAlt = faTrashAlt;
  newWorkspaceTitle: string = '';

  constructor(
    private workspaceSvc: WorkspaceService,
    private apiSvc: ApiService
  ) {}

  deleteWorkspace(wspId: ObjectId) {
    this.workspaceSvc.deleteWorkspace(wspId);
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

  changeWorkspace(wspId: ObjectId) {
    this.currentWorkspaceId = wspId;
    this.changeWorkspaceEvent.emit(wspId);
  }

  isCurrentWorkspace(wspId: ObjectId) {
    if (this.currentWorkspaceId === wspId) return 'active';
    else return '';
  }

  async ngOnInit() {
    this.workspaceSvc.newWorkspaceAdded.subscribe(
      async (currWspId: ObjectId) => {
        await this.workspaceSvc.fetchWorkspaces();
        this.workspaceInfo = this.workspaceSvc.wspInfo;
        this.currentWorkspaceId = currWspId;
        this.changeWorkspace(currWspId);
      }
    );
    this.workspaceSvc.workspaceDeleted.subscribe(
      async (currWspId: ObjectId) => {
        // await this.workspaceSvc.fetchWorkspaces();
        this.workspaceInfo = this.workspaceSvc.wspInfo;
        this.currentWorkspaceId = currWspId;
      }
    );
    this.newWorkspaceTitle = '';
    await this.workspaceSvc.fetchWorkspaces();
    this.workspaceInfo = this.workspaceSvc.wspInfo;
    this.currentWorkspaceId = this.workspaceSvc.currentWspId;
  }
}
