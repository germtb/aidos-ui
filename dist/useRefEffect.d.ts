export declare function useRefEffect<T>(callback: (root: T) => (() => void) | void): (root: T) => void;
