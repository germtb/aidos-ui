import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { BaseView } from "./BaseView";
import { useRefEffect } from "./useRefEffect";
import { Text } from "./Text";
import { cssVar, toClassnames } from "./jss";
const jsss = {
    tooltip: {
        top: "-100%",
        transform: "translateY(50%)",
        backgroundColor: cssVar("--primary-background"),
        padding: `${cssVar("--spacing-s")} ${cssVar("--spacing-m")}`,
        borderRadius: cssVar("--border-radius-m"),
        border: `1px solid ${cssVar("--divider")}`,
        boxShadow: cssVar("--shadow-md"),
        overflow: "hidden",
        animation: "popoverFadeIn 0.15s ease-out",
    },
};
export function Tooltip({ content, jss, tag, children }) {
    const [tooltip, setTooltip] = useState(null);
    const dialogRef = useRef(null);
    const focusTrapRoot = useRefEffect((root) => {
        dialogRef.current = root;
        const keydown = (e) => {
            if (e.key === "Escape") {
                dialogRef.current?.close();
            }
            else if (e.key === "Tab") {
                dialogRef.current?.close();
            }
        };
        const click = () => {
            dialogRef.current?.close();
        };
        window.addEventListener("keydown", keydown);
        window.addEventListener("click", click);
        const activeElement = document.activeElement;
        root.show();
        // @ts-ignore
        activeElement.focus();
        return () => {
            window.removeEventListener("keydown", keydown);
            window.removeEventListener("click", click);
        };
    });
    const toggle = () => {
        if (tooltip == null) {
            setTooltip(_jsx("dialog", { ref: (ref) => {
                    dialogRef.current = ref;
                    focusTrapRoot(ref);
                }, className: toClassnames(jsss.tooltip), onClose: () => {
                    setTooltip(null);
                }, onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }, children: _jsx(Text, { size: "medium", color: "secondary", children: content }) }));
        }
        else {
            setTooltip(null);
        }
    };
    return (_jsxs(BaseView, { tag: tag, relative: true, jss: [{ display: "inline-block" }, jss], onMouseEnter: () => {
            if (tooltip == null) {
                toggle();
            }
        }, onMouseLeave: () => {
            if (tooltip != null) {
                toggle();
            }
        }, children: [children, tooltip] }));
}
//# sourceMappingURL=Tooltip.js.map