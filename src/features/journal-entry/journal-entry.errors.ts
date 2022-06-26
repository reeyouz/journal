import { BaseError } from "../../base";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  PropertyError,
} from "../../shared";

export class JournalEntryValidationError extends BaseError {
  private constructor(errors: PropertyError[]) {
    super("Error while validating some of the properties!", BAD_REQUEST);
    this.errors = errors;
  }

  static Factory(errors: PropertyError[]) {
    return new JournalEntryValidationError(errors);
  }
}

export class JournalEntryCreateError extends BaseError {
  private constructor() {
    super(
      "Unexpected error while adding journal entry!",
      INTERNAL_SERVER_ERROR
    );
  }

  static Factory() {
    return new JournalEntryCreateError();
  }
}
