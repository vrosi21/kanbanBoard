import { ObjectId } from 'mongodb'; // Import ObjectId from MongoDB library

export interface Note {
  _id: ObjectId; // Change _id type to ObjectId
  description: string;
  colour: string;
  parent: ObjectId;
  created: Date;
  reminder: Date;
}
