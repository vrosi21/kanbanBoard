import { ObjectId } from 'mongodb'; // Import ObjectId from MongoDB library

export interface Board {
  _id?: ObjectId; // Change _id type to ObjectId
  title: string;
  colour: string;
  parent?: ObjectId;
}
