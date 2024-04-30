import { Component, OnInit } from '@angular/core';
import { ObjectId } from 'mongodb';
import { ModalService } from 'src/app/services/modal.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  constructor(
    public workspaceService: WorkspaceService,
    public modalSvc: ModalService
  ) {}

  close() {
    this.modalSvc.isOpenDltMdl = false;
  }

  deleteWorkspace() {
    this.workspaceService.deleteWorkspace(this.modalSvc.workspaceId);
    this.close();
  }

  ngOnInit() {}
}
