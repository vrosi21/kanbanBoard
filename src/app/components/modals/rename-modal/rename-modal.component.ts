import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.scss'],
})
export class RenameModalComponent {
  newTitle: string = this.modalSvc.workspaceTitle;
  hasError: boolean = false;

  constructor(
    private workspaceSvc: WorkspaceService,
    public modalSvc: ModalService
  ) {}

  close() {
    this.modalSvc.isOpenRnmMdl = false;
  }

  renameWorkspace() {
    if (this.newTitle !== '') {
      this.hasError = false;
      this.workspaceSvc.renameWorkspace(
        this.modalSvc.workspaceId,
        this.newTitle
      );
      this.close();
    } else {
      this.hasError = true;
    }
  }
}
