import { StatusCodes } from "../shared";

export interface IBaseError {
  title: string;
  detail: string;
  status_code: StatusCodes;
  errors?: any;
}

export abstract class BaseError extends Error implements IBaseError {
  title: string;
  errors?: any;

  constructor(public detail: string, public status_code: StatusCodes) {
    super(detail);
    this.title = new.target.name;
  }
}
