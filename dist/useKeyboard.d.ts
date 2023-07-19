export type KeyboardShortcut<T> = {
    key: string;
    metaKey?: boolean;
    action: (root: T) => void;
};
export declare function useKeyboard<T extends HTMLElement>(shortcuts: Array<KeyboardShortcut<T>>): (root: T) => void;
