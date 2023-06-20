import { useState, useCallback, useEffect, useRef } from "react";

export function useCookie<T, L>(
  key: string,
  {
    initialValue = null,
    loadingValue,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    maxAge = 60 * 60 * 24 * 365,
  }: {
    initialValue: T;
    loadingValue: L;
    serialize?: (t: T) => string;
    deserialize?: (s: string) => T;
    maxAge?: number;
  }
): [T | L, (t: T | ((prevValue: T | L) => T)) => void] {
  const initializationRef = useRef(false);
  const [cookie, setCookie] = useState<T | L>(loadingValue);

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
      document.cookie = `${key}=${serialize(initialValue)}; max-age=${maxAge};`;
      setCookie(initialValue);
    }
    initializationRef.current = true;
  }, []);

  return [
    cookie,
    useCallback((t: T | ((prevValue: T | L) => T)) => {
      if (typeof t === "function") {
        // @ts-ignore
        const callback: (prevValue: T | L) => T = t;
        setCookie((oldCookie) => {
          const newValue = callback(oldCookie);
          document.cookie = `${key}=${serialize(newValue)}; max-age=${maxAge};`;
          return newValue;
        });
      } else {
        setCookie(t);
        document.cookie = `${key}=${serialize(t)}; max-age=${maxAge};`;
      }
    }, []),
  ];
}
