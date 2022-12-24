export declare function usePromise<T>(promiseFactory: () => Promise<T>, inputs: Array<any>, initialValue: T): [T | null, any];
