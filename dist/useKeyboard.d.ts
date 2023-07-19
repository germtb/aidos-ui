export type KeyboardShortcut<T> = {
    key: string;
    metaKey?: boolean;
    ctrlKey?: boolean;
    action: (root: T) => void;
    onlyWhenFocused?: boolean;
};
export declare function useKeyboard<T extends HTMLElement>(shortcuts: Array<KeyboardShortcut<T>>): (root: T) => void;
