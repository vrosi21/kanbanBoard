import { ObjectId } from 'mongodb'; // Import ObjectId from MongoDB library

export interface Workspace {
  _id?: ObjectId; // Change _id type to ObjectId
  author?: string;
  title: string;
}
