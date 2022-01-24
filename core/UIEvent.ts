type ElementUpdate = {
  type: "elementUpdate";
  ID: string;
};

export type UIEvent = ElementUpdate;

function create() {
  const subscriptions = new Map<
    UIEvent["type"],
    Set<(event: UIEvent) => void>
  >();

  function dispatch(event: UIEvent) {
    const set = subscriptions.get(event.type);

    if (!set) {
      return;
    }

    set.forEach((subscription: (event: UIEvent) => void) => {
      subscription(event);
    });
  }

  function subscribe<T extends UIEvent>(
    type: T["type"],
    callback: (event: T) => void
  ): () => void {
    if (!subscriptions.has(type)) {
      subscriptions.set(type, new Set());
    }
    subscriptions.get(type).add(callback);

    return () => subscriptions.get(type).delete(callback);
  }

  return {
    dispatch,
    subscribe,
  };
}

export const { subscribe, dispatch } = create();
