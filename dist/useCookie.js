import { useState, useCallback, useEffect, useRef } from "react";
export function useCookie(key, { initialValue = null, serialize = JSON.stringify, deserialize = JSON.parse, maxAge = 60 * 60 * 24 * 365, } = {
    initialValue: null,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    maxAge: 60 * 60 * 24 * 365,
}) {
    const initializationRef = useRef(false);
    const [cookie, setCookie] = useState(() => {
        return (initialValue);
    });
    useEffect(() => {
        if (initializationRef.current === true) {
            return;
        }
        const hasPersistedValue = document.cookie
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
        }
        else {
            document.cookie = `${key}=${serialize(initialValue)}; max-age=${maxAge};`;
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