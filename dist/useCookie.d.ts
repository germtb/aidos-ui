export declare function hasCookie(key: string): boolean;
export declare function getCookie<T>(key: string, deserialize?: (s: string) => T): T;
export declare function useCookie<T, L>(key: string, { initialValue, loadingValue, serialize, deserialize, maxAge, }: {
    initialValue: T;
    loadingValue: L;
    serialize?: (t: T) => string;
    deserialize?: (s: string) => T;
    maxAge?: number;
}): [T | L, (t: T | ((prevValue: T | L) => T)) => void];
