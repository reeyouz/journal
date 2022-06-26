import { Either, Success } from ".";

export class Failure<S, F> {
  constructor(public readonly value: F) {}

  isSuccess(): this is Success<S, F> {
    return false;
  }

  isFailure(): this is Failure<S, F> {
    return true;
  }
}

export function failure<S, F>(value: F): Either<S, F> {
  return new Failure<S, F>(value);
}
