export type Result<T> = { success: true; value: T };
export type Error<T> = { success: false; error: T };
export type ResultOrError<R, E> = Result<R> | Error<E>;

export function makeResult<T>(t: void): Result<void>;
export function makeResult<T>(t: T): Result<T>;
export function makeResult<T>(t: T): Result<T> {
  return { success: true, value: t };
}

export function makeError<T>(t: void): Error<void>;
export function makeError<T>(t: T): Error<T>;
export function makeError<T>(t: T): Error<T> {
  return { success: false, error: t };
}
