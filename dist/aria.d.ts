declare type Focusable = HTMLElement;
export declare function queryFocusables(root: HTMLElement): Focusable[];
export declare function queryGrid(root: HTMLElement): HTMLElement[][];
export declare const normalizeGrid: (rows: HTMLElement[][], rowIndex: number, columnIndex: number) => void;
export declare const focusGridElement: (rows: HTMLElement[][], rowIndex: number, columnIndex: number) => void;
export declare const normalizeElements: (focusables: HTMLElement[], index: number) => void;
export declare const focusElement: (focusables: HTMLElement[], index: number) => void;
export {};
