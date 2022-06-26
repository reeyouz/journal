import { Failure, Success } from ".";

export type Either<S, F> = Success<S, F> | Failure<S, F>;
