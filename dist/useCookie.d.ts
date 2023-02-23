/// <reference types="react" />
export declare function useCookie<T>(key: string, { initialValue, serialize, deserialize, maxAge, }?: {
    initialValue: T;
    serialize?: (t: T) => string;
    deserialize?: (s: string) => T;
    maxAge?: number;
}): [T, React.Dispatch<React.SetStateAction<T>>];
