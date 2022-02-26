export type Callback<Value> = (value: Value) => void;

export type Subscribe<Value> = (callback: Callback<Value>) => () => void;

export function createEmitter<Value>() {
  const subscriptions = new Set<Callback<Value>>();

  const subscribe: Subscribe<Value> = (callback: Callback<Value>) => {
    subscriptions.add(callback);

    return () => {
      subscriptions.delete(callback);
    };
  };

  const emit = (value: Value) => {
    subscriptions.forEach((subscription) => {
      subscription(value);
    });
  };

  return {
    subscribe,
    emit,
  };
}
