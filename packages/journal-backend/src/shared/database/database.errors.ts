import { INTERNAL_SERVER_ERROR } from "..";
import { BaseError } from "../../base";

export class DatabaseConnectionError extends BaseError {
  private constructor(url: string) {
    super(`Failed to connect with database at ${url}!`, INTERNAL_SERVER_ERROR);
  }

  static Factory(url: string) {
    return new DatabaseConnectionError(url);
  }
}

export class DatabaseDisconnectionError extends BaseError {
  private constructor() {
    super("Failed to disconnect with database!", INTERNAL_SERVER_ERROR);
  }

  static Factory() {
    return new DatabaseDisconnectionError();
  }
}

export class DatabaseNotConnectedError extends BaseError {
  private constructor() {
    super("Database not connected!", INTERNAL_SERVER_ERROR);
  }

  static Factory() {
    return new DatabaseNotConnectedError();
  }
}
