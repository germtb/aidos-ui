import React, { useRef, useState } from "react";
import { BaseView } from "./BaseView";
import { createClassNames, createJSStyles } from "./Palette";
import { useRefEffect } from "./useRefEffect";
const jsStyles = createJSStyles({
    root: {
        position: "relative",
    },
    tooltip: {
        zIndex: 1,
        backgroundColor: "var(--primary-background)",
        borderRadius: "var(--border-radius-m)",
        border: "1px solid var(--divider)",
        overflow: "hidden",
    },
});
export function Tooltip({ TooltipContent, jsStyle, grow, shrink, tag, children, }) {
    const [tooltip, setTooltip] = useState(null);
    const activeElementRef = useRef(null);
    const dialogRef = useRef(null);
    const focusTrapRoot = useRefEffect((root) => {
        activeElementRef.current = document.activeElement;
        dialogRef.current = root;
        root.focus();
        const keydown = (e) => {
            if (e.key === "Escape") {
                close();
            }
            else if (e.key === "Tab") {
                close();
            }
        };
        const click = () => {
            close();
        };
        window.addEventListener("keydown", keydown);
        // This is needed so that the trigger click is not captured immediatly, which would close the tooltip as it opens
        setTimeout(() => {
            window.addEventListener("click", click);
        }, 0);
        return () => {
            activeElementRef.current && activeElementRef.current.focus();
            window.removeEventListener("keydown", keydown);
            window.removeEventListener("click", click);
        };
    });
    const toggle = () => {
        if (tooltip == null) {
            setTooltip(React.createElement("dialog", { ref: (ref) => {
                    dialogRef.current = ref;
                    focusTrapRoot(ref);
                }, className: createClassNames(jsStyles.tooltip), onClose: () => {
                    setTooltip(null);
                }, onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                } },
                React.createElement(TooltipContent, null)));
        }
        else {
            setTooltip(null);
        }
    };
    return (React.createElement(BaseView, { grow: grow, shrink: shrink, tag: tag, relative: true, jsStyle: [jsStyle, jsStyles.root], onMouseOver: () => {
            if (tooltip == null) {
                toggle();
            }
        }, onMouseOut: () => {
            if (tooltip != null) {
                toggle();
            }
        }, onClick: () => {
            toggle();
        } },
        children,
        tooltip));
}
//# sourceMappingURL=Tooltip.js.map