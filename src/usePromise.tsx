import { useState, useEffect, useRef } from "react";

export function usePromise<T>(
  promiseFactory: () => Promise<T>,
  inputs: ReadonlyArray<unknown>,
  initialValue: T
): [T | null, unknown] {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<unknown>(null);
  const previousInputs = useRef<ReadonlyArray<unknown> | null>(null);

  useEffect(() => {
    if (
      previousInputs.current != null &&
      previousInputs.current.length === inputs.length &&
      previousInputs.current.every((input, index) => input === inputs[index])
    ) {
      return;
    }

    previousInputs.current = inputs;
    let cancelled = false;
    promiseFactory()
      .then((value) => {
        if (!cancelled) setValue(value);
      })
      .catch((error: unknown) => {
        if (!cancelled) setError(error);
      });

    return () => {
      cancelled = true;
    };
  });

  return [value, error];
}
