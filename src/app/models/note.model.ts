import { ObjectId } from 'mongodb';

export interface Note {
  _id?: ObjectId;
  title: string;
  description: string;
  colour: string;
  parent?: ObjectId;
  created?: Date;
  reminder?: Date;
}
