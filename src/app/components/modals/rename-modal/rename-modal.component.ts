import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObjectId } from 'mongodb';

@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.css'],
})
export class RenameModalComponent {
  @Input() workspaceTitle?: string;
  @Input() workspaceId?: ObjectId;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
