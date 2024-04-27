import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ObjectId } from 'mongodb';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() changeWorkspaceEvent = new EventEmitter<ObjectId>();
  hasError: boolean = false;
  faTrashAlt = faTrashAlt;
  newWorkspaceTitle: string = '';

  constructor(public workspaceSvc: WorkspaceService) {}

  addNewWorkspace() {
    if (this.newWorkspaceTitle.trim() !== '') {
      this.hasError = false; // No error
      this.workspaceSvc.createNewWorkspace(this.newWorkspaceTitle);
      this.newWorkspaceTitle = '';
    } else {
      this.hasError = true; // Input is empty, set error flag
    }
  }

  isCurrentWorkspace(wspId: ObjectId) {
    if (this.workspaceSvc.currentWorkspaceId === wspId) return 'active';
    else return '';
  }

  async ngOnInit() {
    this.workspaceSvc.newWorkspaceAdded.subscribe(
      async (currWspId: ObjectId) => {
        await this.workspaceSvc.fetchWorkspaces();
        this.workspaceSvc.changeWorkspace(currWspId);
      }
    );
    // this.workspaceSvc.workspaceDeleted.subscribe(
    //   async (currWspId: ObjectId) => {
    //     // await this.workspaceSvc.fetchWorkspaces();
    //   }
    // );
    this.newWorkspaceTitle = '';
    await this.workspaceSvc.fetchWorkspaces();
  }
}
