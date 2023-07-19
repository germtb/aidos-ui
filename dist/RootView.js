import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useCallback } from "react";
import { Column } from "./Column";
import { useIsTopOfStack } from "./StackContext";
import { queryFocusables } from "./aria";
import { cssVar } from "./jss";
export function RootView({ children, focusOnlyOnFirstMount = true, }) {
    const isTopOfStack = useIsTopOfStack();
    const firstMountRef = useRef(true);
    const refCallback = useCallback((element) => {
        if (!element) {
            return;
        }
        if (!isTopOfStack) {
            return;
        }
        if (focusOnlyOnFirstMount && !firstMountRef.current) {
            return;
        }
        const focusables = queryFocusables(element);
        const firstFocusable = focusables[0];
        firstMountRef.current = false;
        firstFocusable && firstFocusable.focus();
    }, [isTopOfStack, focusOnlyOnFirstMount]);
    return (_jsx(Column, { ref: refCallback, jsStyle: {
            marginBottom: 0,
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "0%",
            overflow: "auto",
            backgroundColor: cssVar("--secondary-background"),
            minHeight: "600px",
        }, children: children }));
}
//# sourceMappingURL=RootView.js.map