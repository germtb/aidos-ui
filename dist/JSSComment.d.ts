/**
 * Injects a real HTML comment node (<!-- ComponentName -->) into the DOM.
 * Uses a hidden anchor span as a placement reference, then inserts
 * the comment immediately before it.
 *
 * No-op on the server. Dev-only — the JSX dev runtime wraps component renders with this.
 */
export declare function JSSComment({ name }: {
    name: string;
}): import("react/jsx-runtime").JSX.Element;
