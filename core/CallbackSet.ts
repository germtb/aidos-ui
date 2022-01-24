export function createCallbackSet<T>() {
  const set = new Set<(args: T) => void>();

  function add(callback: (args: T) => void) {
    const reference = (args: T) => callback(args);

    set.add(reference);

    return () => {
      set.delete(reference);
    };
  }

  function call(args: T) {
    set.forEach((callback) => callback(args));
  }

  return { add, call };
}
