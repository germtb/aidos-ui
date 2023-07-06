export type Callback<Value> = (value: Value) => void;
export type Subscribe<Value> = (callback: Callback<Value>) => () => void;
export declare function createEmitter<Value>(): {
    subscribe: Subscribe<Value>;
    emit: (value: Value) => void;
};
