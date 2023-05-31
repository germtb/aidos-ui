import React, { useRef, useState } from "react";
import { BaseView } from "./BaseView";
import { createClassNames, createJSStyles } from "./Palette";
import { useRefEffect } from "./useRefEffect";
import { Text } from "./Text";
const jsStyles = createJSStyles({
    root: {
        position: "relative",
    },
    tooltip: {
        top: "-100%",
        transform: "translateY(50%)",
        background: "var(--primary-background)",
        padding: "var(--spacing-s)",
        borderRadius: "var(--border-radius-m)",
        border: "1px solid var(--divider)",
        boxShadow: "0px 1px 2px var(--divider)",
        overflow: "hidden",
    },
});
export function Tooltip({ content, jsStyle, grow, shrink, tag, children, }) {
    const [tooltip, setTooltip] = useState(null);
    const dialogRef = useRef(null);
    const focusTrapRoot = useRefEffect((root) => {
        dialogRef.current = root;
        const keydown = (e) => {
            if (e.key === "Escape") {
                dialogRef.current.close();
            }
            else if (e.key === "Tab") {
                dialogRef.current.close();
            }
        };
        const click = () => {
            dialogRef.current.close();
        };
        window.addEventListener("keydown", keydown);
        window.addEventListener("click", click);
        root.show();
        return () => {
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
                React.createElement(Text, { size: "medium", color: "secondary" }, content)));
        }
        else {
            setTooltip(null);
        }
    };
    return (React.createElement(BaseView, { grow: grow, shrink: shrink, tag: tag, relative: true, jsStyle: [jsStyle, jsStyles.root], onMouseEnter: () => {
            if (tooltip == null) {
                toggle();
            }
        }, onMouseLeave: () => {
            if (tooltip != null) {
                toggle();
            }
        } },
        children,
        tooltip));
}
//# sourceMappingURL=Tooltip.js.map