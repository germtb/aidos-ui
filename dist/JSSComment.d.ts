/**
 * Injects a real HTML comment node (<!-- ComponentName -->) into the DOM.
 *
 * Renders nothing (null). Uses the React fiber tree to locate the sibling
 * component's first DOM node, then inserts a comment before it.
 * Client-only — no SSR output, no hydration mismatch.
 */
export declare function JSSComment({ name }: {
    name: string;
}): any;
