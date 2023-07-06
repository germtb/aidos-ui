export type Result<T> = {
    success: true;
    value: T;
};
export type Error<T> = {
    success: false;
    error: T;
};
export type ResultOrError<R, E> = Result<R> | Error<E>;
export declare function makeResult<T>(t: void): Result<void>;
export declare function makeResult<T>(t: T): Result<T>;
export declare function makeError<T>(t: void): Error<void>;
export declare function makeError<T>(t: T): Error<T>;
