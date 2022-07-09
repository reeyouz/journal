import { INTERNAL_SERVER_ERROR } from "..";
import { BaseError } from "../../base";

export class UnexpectedError extends BaseError {
  private constructor(error: unknown) {
    super("An unexpected error occured!", INTERNAL_SERVER_ERROR);
    this.errors = error;
  }

  static Factory(error: unknown) {
    return new UnexpectedError(error);
  }
}
