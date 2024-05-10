import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ObjectId } from 'mongodb';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() changeWorkspaceEvent = new EventEmitter<ObjectId>();
  hasError: boolean = false;
  trashIcon = faTrashAlt;
  renameIcon = faPencilAlt;
  newWorkspaceTitle: string = '';

  constructor(
    public workspaceSvc: WorkspaceService,
    public modalSvc: ModalService
  ) {}

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
    await this.workspaceSvc.fetchWorkspaces();
    this.workspaceSvc.newWorkspaceAdded.subscribe(
      async (currWspId: ObjectId) => {
        await this.workspaceSvc.fetchWorkspaces();
        this.workspaceSvc.changeWorkspace(currWspId);
      }
    );
    this.newWorkspaceTitle = '';
  }
}
