import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { isServer } from "./isServer";
/**
 * Injects a real HTML comment node (<!-- ComponentName -->) into the DOM.
 * Uses a hidden anchor span as a placement reference, then inserts
 * the comment immediately before it.
 *
 * No-op on the server. Dev-only — the JSX dev runtime wraps component renders with this.
 */
export function JSSComment({ name }) {
    const ref = useRef(null);
    useEffect(() => {
        const anchor = ref.current;
        if (!anchor?.parentNode)
            return;
        const comment = document.createComment(` ${name} `);
        anchor.parentNode.insertBefore(comment, anchor);
        return () => {
            comment.remove();
        };
    }, [name]);
    if (isServer())
        return null;
    return _jsx("span", { ref: ref, style: { display: "none" }, "data-jss-anchor": "" });
}
//# sourceMappingURL=JSSComment.js.map