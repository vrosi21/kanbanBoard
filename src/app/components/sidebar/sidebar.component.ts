import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ObjectId } from 'mongodb';
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
  isOpenRnmMdl: boolean = false;
  wspRenameTitle?: string;
  wspRenameId?: ObjectId;

  constructor(public workspaceSvc: WorkspaceService) {}

  openModal(wspTitle: string, wspId: ObjectId) {
    this.isOpenRnmMdl = true;
    this.wspRenameTitle = wspTitle;
    this.wspRenameId = wspId;
  }

  closeModal() {
    this.isOpenRnmMdl = false;
    this.wspRenameTitle = undefined;
    this.wspRenameId = undefined;
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
    this.newWorkspaceTitle = '';
    await this.workspaceSvc.fetchWorkspaces();
  }
}
