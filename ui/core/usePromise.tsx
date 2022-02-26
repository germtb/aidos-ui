import { useState, useEffect } from "react";

export default function usePromise<T>(
  promiseFactory: () => Promise<T>,
  inputs: Array<any>,
  initialValue: T
): [T | null, any] {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);

  useEffect(() => {
    promiseFactory()
      .then(value => setValue(value))
      .catch(error => setError(error));

    // This is intended
    // eslint-disable-next-line
  }, inputs);

  return [value, error];
}
