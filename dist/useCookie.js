import { useState, useCallback, useEffect, useRef } from "react";
export function hasCookie(key) {
    return (document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((c) => c.startsWith(`${key}=`)).length > 0);
}
export function getCookie(key, deserialize = JSON.parse) {
    return document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((c) => c.startsWith(`${key}=`))
        .map((s) => s.split("=")[1])
        .map((s) => deserialize(s))
        .pop();
}
export function useCookie(key, { initialValue = null, loadingValue, serialize = JSON.stringify, deserialize = JSON.parse, maxAge = 60 * 60 * 24 * 365, }) {
    const initializationRef = useRef(false);
    const [cookie, setCookie] = useState(() => {
        if (typeof window !== "undefined") {
            const hasPersistedCookie = hasCookie(key);
            if (hasPersistedCookie) {
                return getCookie(key, deserialize);
            }
            else {
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
        if (hasPersistedCookie) {
            const persistedCookie = getCookie(key, deserialize);
            setCookie(persistedCookie);
        }
        else {
            document.cookie = `${key}=${serialize(initialValue)}; max-age=${maxAge};`;
            setCookie(initialValue);
        }
        initializationRef.current = true;
    }, []);
    return [
        cookie,
        useCallback((t) => {
            if (typeof t === "function") {
                // @ts-ignore
                const callback = t;
                setCookie((oldCookie) => {
                    const newValue = callback(oldCookie);
                    document.cookie = `${key}=${serialize(newValue)}; max-age=${maxAge};`;
                    return newValue;
                });
            }
            else {
                setCookie(t);
                document.cookie = `${key}=${serialize(t)}; max-age=${maxAge};`;
            }
        }, []),
    ];
}
//# sourceMappingURL=useCookie.js.map