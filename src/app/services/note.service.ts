import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Note } from '../models/note.model';
import { HttpClient } from '@angular/common/http';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends ApiService<Note> {
  newNoteAdded: EventEmitter<ObjectId> = new EventEmitter<ObjectId>();
  noteDeleted: EventEmitter<ObjectId> = new EventEmitter<ObjectId>();
  noteEdited: EventEmitter<ObjectId> = new EventEmitter<ObjectId>();

  constructor(http: HttpClient) {
    super(http, '/notes/');
  }

  createNewNote(title: string, desc: string, color: string, prntId?: ObjectId) {
    const newNote = {
      title: title,
      description: desc,
      parent: prntId,
      colour: color,
    };
    this.post(newNote).subscribe(
      (res: any) => {
        console.log('Added new note with ID:', res._id);

        this.newNoteAdded.emit(prntId);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  editNote(id: ObjectId, title: string, desc: string, color: string) {
    const editedNote: Note = {
      _id: id,
      title: title,
      description: desc,
      colour: color,
    };
    this.put(id, editedNote).subscribe(
      (res: any) => {
        console.log('Note with id: ', id, 'edited successfully.');
        this.noteEdited.emit(res.parent);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  deleteNote(ntId: ObjectId, parent?: ObjectId) {
    this.delete(ntId).subscribe(
      () => {
        this.noteDeleted.emit(parent);
        console.log('Delete operation completed successfully.');
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  clearCache() {}
}
