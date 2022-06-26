import { ObjectId } from "mongodb";

export interface IBaseModel {
  _id: string;
}

export abstract class BaseModel implements IBaseModel {
  _id: string;

  constructor(_id = new ObjectId()) {
    this._id = _id.toString();
  }
}
