import { useState, useCallback, useEffect, useRef } from "react";

export function useCookie<T>(
  key: string,
  {
    initialValue = null,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    maxAge = 60 * 60 * 24 * 365,
  }: {
    initialValue: T;
    serialize?: (t: T) => string;
    deserialize?: (s: string) => T;
    maxAge?: number;
  } = {
    initialValue: null,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    maxAge: 60 * 60 * 24 * 365,
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const initializationRef = useRef(false);
  const [cookie, setCookie] = useState<T>(() => {
    return initialValue;
  });

  useEffect(() => {
    if (initializationRef.current === true) {
      return;
    }

    const hasPersistedValue =
      document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((c) => c.startsWith(`${key}=`)).length > 0;

    if (hasPersistedValue) {
      const persistedValue = document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((c) => c.startsWith(`${key}=`))
        .map((s) => s.split("=")[1])
        .map((s) => deserialize(s))
        .pop();

      setCookie(persistedValue);
    } else {
      document.cookie = `${key}=${serialize(
        initialValue
      )}; max-age=${maxAge}; SameSite=None`;
    }
    initializationRef.current = true;
  }, []);

  return [
    cookie,
    useCallback((t: T | ((prevValue: T) => T)) => {
      if (typeof t === "function") {
        // @ts-ignore
        const callback: (prevValue: T) => T = t;
        setCookie((oldCookie) => {
          const newValue = callback(oldCookie);
          document.cookie = `${key}=${serialize(
            newValue
          )}; max-age=${maxAge}; SameSite=None`;
          return newValue;
        });
      } else {
        setCookie(t);
        document.cookie = `${key}=${serialize(
          t
        )}; max-age=${maxAge}; SameSite=None`;
      }
    }, []),
  ];
}
