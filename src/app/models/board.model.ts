import { ObjectId } from 'mongodb'; // Import ObjectId from MongoDB library

export interface WorkspaceInfo {
  _id: ObjectId; // Change _id type to ObjectId
  title: string;
}

export interface Workspace {
  _id: ObjectId; // Change _id type to ObjectId
  author: string;
  title: string;
  arrayOfBoards: Board[];
}
export interface Board {
  _id: ObjectId; // Change _id type to ObjectId
  title: string;
  colour: string;
  arrayOfNotes: Note[];
}
export interface Note {
  _id: ObjectId; // Change _id type to ObjectId
  description: string;
  colour: string;
  created: string;
  reminder: string;
}
