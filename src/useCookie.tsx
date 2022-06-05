import { useState, useCallback, useEffect } from "react";

export function useCookie<T>(
  key: string,
  {
    initialValue = null,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    maxAge = 60 * 60 * 24 * 365,
  }: {
    initialValue?: T | null;
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
  const [cookie, setCookie] = useState<T | null>(() => {
    return (
      document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((c) => c.startsWith(`${key}=`))
        .map((s) => s.split("=")[1])
        .map((s) => deserialize(s))
        .pop() ?? initialValue
    );
  });

  useEffect(() => {
    if (
      document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((c) => c.startsWith(`${key}=`)).length === 0
    ) {
      document.cookie = `${key}=${serialize(initialValue)}; max-age=${maxAge};`;
    }
  }, []);

  return [
    cookie,
    useCallback((t: T | ((prevValue: T) => T)) => {
      if (typeof t === "function") {
        // @ts-ignore
        const callback: (prevValue: T) => T = t;
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
