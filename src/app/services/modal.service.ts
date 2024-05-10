import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpenEdtMdl: boolean = false;
  isOpenDltMdl: boolean = false;
  isOpenAuthMdl: boolean = false;
  isOpenCreateMdl: boolean = false;

  isLoginMode!: boolean;

  objectId!: ObjectId;
  objectTitle!: string;
  objectDescription!: string;
  objectType!: string;
  objectColor!: string;
  parent?: ObjectId;

  constructor() {}

  openCreateModal(type: string, parent?: ObjectId) {
    this.objectType = type;
    this.parent = parent;
    this.isOpenCreateMdl = true;
  }

  openLoginModal() {
    this.isLoginMode = true;
    this.isOpenAuthMdl = true;
  }

  openRegisterModal() {
    this.isLoginMode = false;
    this.isOpenAuthMdl = true;
  }

  openEditModal(
    id: ObjectId,
    title: string,
    type: string,
    color?: string,
    desc?: string
  ) {
    this.objectId = id;
    this.objectTitle = title;
    this.objectType = type;
    if (color) this.objectColor = color;
    if (desc) this.objectDescription = desc;
    this.isOpenEdtMdl = true;
  }

  openDeleteModal(id: ObjectId, title: string, type: string) {
    this.objectId = id;
    this.objectTitle = title;
    this.objectType = type;
    this.isOpenDltMdl = true;
  }
}
