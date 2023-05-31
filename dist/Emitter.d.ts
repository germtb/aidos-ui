export declare type Callback<Value> = (value: Value) => void;
export declare type Subscribe<Value> = (callback: Callback<Value>) => () => void;
export declare function createEmitter<Value>(): {
    subscribe: Subscribe<Value>;
    emit: (value: Value) => void;
};
