import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpenRnmMdl: boolean = false;
  isOpenDltMdl: boolean = false;
  workspaceId!: ObjectId;
  workspaceTitle!: string;

  constructor() {}

  openRenameModal(wspId: ObjectId, wspTitle: string) {
    this.isOpenRnmMdl = true;
    this.workspaceId = wspId;
    this.workspaceTitle = wspTitle;
  }

  openDeleteModal(wspId: ObjectId, wspTitle: string) {
    this.isOpenDltMdl = true;
    this.workspaceId = wspId;
    this.workspaceTitle = wspTitle;
  }
}
