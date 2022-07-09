import { Either, Failure } from ".";

export class Success<S, F> {
  constructor(public readonly value: S) {}

  isSuccess(): this is Success<S, F> {
    return true;
  }

  isFailure(): this is Failure<S, F> {
    return false;
  }
}

export function success<S, F>(value: S): Either<S, F> {
  return new Success<S, F>(value);
}
