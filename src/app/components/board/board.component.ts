import { Component, Input } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  trashIcon = faTrashAlt;
  renameIcon = faPencilAlt;
  @Input() board!: Board;

  constructor(public modalSvc: ModalService) {}
}
