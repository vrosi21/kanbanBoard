import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObjectId } from 'mongodb';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.scss'],
})
export class RenameModalComponent {
  newTitle: string = '';
  hasError: boolean = false;
  @Input() workspaceTitle!: string;
  @Input() workspaceId!: ObjectId;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private workspaceSvc: WorkspaceService) {}

  close() {
    this.closeModal.emit();
  }

  renameWsp() {
    if (this.newTitle !== '') {
      this.hasError = false;
      this.workspaceSvc.renameWorkspace(this.workspaceId, this.newTitle);
      this.close();
    } else {
      this.hasError = true;
    }
  }
}
