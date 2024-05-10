import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ObjectId } from 'mongodb';
import { mergeMap } from 'rxjs/operators';
import { Board } from '../models/board.model';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService extends ApiService<Board> {
  boards: Board[] = [];
  isWorkspaceEmpty!: boolean;
  constructor(http: HttpClient, private noteSvc: NoteService) {
    super(http, '/boards/');
  }

  createNewBoard(title: string, color: string, prntId?: ObjectId) {
    const newBoard = { title: title, parent: prntId, colour: color };
    this.post(newBoard).subscribe(
      (res: any) => {
        console.log('Added new board with ID:', res._id);
        this.isWorkspaceEmpty = false;
        this.fetchBoards(res.parent);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  async fetchBoards(wspId?: ObjectId) {
    const path = `?parent=${wspId}`;
    const boards = await this.get(path);
    this.boards = boards || [];
    console.log(boards);

    if (this.boards.length > 0) {
      this.isWorkspaceEmpty = false;
    } else {
      this.isWorkspaceEmpty = true;
    }
  }

  renameBoard(brdId: ObjectId, newTitle: string, brdColor: string) {
    const renamedBoard: Board = {
      _id: brdId,
      title: newTitle,
      colour: brdColor,
    };
    this.put(brdId, renamedBoard).subscribe(
      (res: any) => {
        console.log(
          'Board with id: ',
          brdId,
          'renamed to ',
          renamedBoard.title,
          ' successfully.'
        );
        console.log('PARENT:   ', res.parent);

        this.fetchBoards(res.parent);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  deleteBoard(brdId: ObjectId) {
    this.delete(brdId)
      .pipe(
        mergeMap(() => {
          this.boards = this.boards.filter((brd) => brd._id !== brdId);

          if (this.boards.length > 0) {
            this.isWorkspaceEmpty = true;
          }

          const deleteUrl = `${this.url}/notes?parent=${brdId}`;
          return this.deleteByParent(deleteUrl);
        })
      )
      .subscribe(
        () => {
          console.log('Delete operation completed successfully.');
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  clearCache() {
    this.boards = [];

    this.noteSvc.clearCache();
  }
}
