import { useState, useCallback, useEffect } from "react";
export function useCookie(key, { initialValue = null, serialize = JSON.stringify, deserialize = JSON.parse, maxAge = 60 * 60 * 24 * 365, } = {
    initialValue: null,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    maxAge: 60 * 60 * 24 * 365,
}) {
    const [cookie, setCookie] = useState(() => {
        return (document.cookie
            .split(";")
            .map((c) => c.trim())
            .filter((c) => c.startsWith(`${key}=`))
            .map((s) => s.split("=")[1])
            .map((s) => deserialize(s))
            .pop() ?? initialValue);
    });
    useEffect(() => {
        if (document.cookie
            .split(";")
            .map((c) => c.trim())
            .filter((c) => c.startsWith(`${key}=`)).length === 0) {
            document.cookie = `${key}=${serialize(initialValue)}; max-age=${maxAge};`;
        }
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