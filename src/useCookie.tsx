import { useState, useCallback, useEffect, useRef } from "react";
import { isServer } from "./isServer";

export function hasCookie(key: string): boolean {
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((c) => c.startsWith(`${key}=`)).length > 0
  );
}

export function getCookie<T>(
  key: string,
  deserialize: (s: string) => T = JSON.parse
): T {
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.startsWith(`${key}=`))
    .map((s) => s.split("=")[1])
    .map((s) => deserialize(s))
    .reverse()
    .pop();
}

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
  const [cookie, setCookie] = useState<T | L>(() => {
    if (!isServer()) {
      const hasPersistedCookie = hasCookie(key);
      if (hasPersistedCookie) {
        return getCookie(key, deserialize);
      } else {
        return loadingValue;
      }
    }

    return loadingValue;
  });

  useEffect(() => {
    if (initializationRef.current === true) {
      return;
    }

    const hasPersistedCookie = hasCookie(key);

    const nextCookie = hasPersistedCookie
      ? getCookie(key, deserialize)
      : initialValue;

    if (!hasPersistedCookie) {
      document.cookie = `${key}=${serialize(
        initialValue
      )}; max-age=${maxAge};path=/;`;
    }
    initializationRef.current = true;

    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) {
        setCookie(nextCookie);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [deserialize, initialValue, key, maxAge, serialize]);

  return [
    cookie,
    useCallback((t: T | ((prevValue: T | L) => T)) => {
      if (typeof t === "function") {
        const callback = t as (prevValue: T | L) => T;
        setCookie((oldCookie) => {
          const newValue = callback(oldCookie);
          document.cookie = `${key}=${serialize(
            newValue
          )}; max-age=${maxAge};path=/;`;
          return newValue;
        });
      } else {
        setCookie(t);
        document.cookie = `${key}=${serialize(t)}; max-age=${maxAge};path=/;`;
      }
    }, [key, maxAge, serialize]),
  ];
}
