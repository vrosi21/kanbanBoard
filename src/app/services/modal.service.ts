import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpenEdtMdl: boolean = false;
  isOpenDltMdl: boolean = false;
  isOpenAuthMdl: boolean = false;
  isOpenNewBrdMdl: boolean = false;

  isLoginMode!: boolean;

  objectId!: ObjectId;
  objectTitle!: string;
  objectType!: string;
  objectColor!: string;

  constructor() {}

  openNewBoardModal() {
    this.isOpenNewBrdMdl = true;
  }

  openLoginModal() {
    this.isLoginMode = true;
    this.isOpenAuthMdl = true;
  }

  openRegisterModal() {
    this.isLoginMode = false;
    this.isOpenAuthMdl = true;
  }

  openEditModal(id: ObjectId, title: string, type: string, color?: string) {
    this.isOpenEdtMdl = true;
    this.objectId = id;
    this.objectTitle = title;
    this.objectType = type;
    if (color) this.objectColor = color;
  }

  openDeleteModal(id: ObjectId, title: string, type: string) {
    this.isOpenDltMdl = true;
    this.objectId = id;
    this.objectTitle = title;
    this.objectType = type;
  }
}
