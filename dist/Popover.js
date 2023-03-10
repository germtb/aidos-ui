import React, { useEffect, useRef, useState } from "react";
import { BaseView } from "./BaseView";
import { createJSStyles } from "./Palette";
import { queryFocusables } from "./aria";
import { useRefEffect } from "./useRefEffect";
const jsStyles = createJSStyles({
    popover: {
        position: "absolute",
        backgroundColor: "var(--primary-background)",
        borderRadius: "var(--border-radius-m)",
        zIndex: 1,
        border: "1px solid var(--divider)",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        display: "flex",
    },
    header: {
        gridArea: "header",
    },
    content: {
        gridArea: "content",
    },
    trigger: {
        position: "relative",
    },
});
export function Popover({ children, close }) {
    const activeElementRef = useRef(null);
    useEffect(() => {
        const keydown = (e) => {
            if (e.key === "Escape") {
                close();
            }
        };
        const click = () => {
            close();
        };
        window.addEventListener("keydown", keydown);
        window.addEventListener("click", click);
        return () => {
            window.removeEventListener("keydown", keydown);
            window.removeEventListener("click", click);
            activeElementRef.current && activeElementRef.current.focus();
            activeElementRef.current = document.activeElement;
        };
    }, []);
    const refCallback = useRefEffect((root) => {
        activeElementRef.current = document.activeElement;
        const [element] = queryFocusables(root);
        element && element.focus();
        const onKeyDown = (e) => {
            if (e.key === "Tab") {
                const elements = queryFocusables(root);
                if (elements.length === 0) {
                    return;
                }
                const first = elements[0];
                const last = elements[elements.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
                else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        root.addEventListener("keydown", onKeyDown);
        return () => {
            root.removeEventListener("keydown", onKeyDown);
        };
    });
    return (React.createElement(BaseView, { ref: refCallback, jsStyle: jsStyles.popover }, children));
}
export function PopoverTrigger({ PopoverComponent, jsStyle, className, grow, shrink, tag, children, }) {
    const [popover, setPopover] = useState(null);
    const close = () => {
        setPopover(null);
    };
    const open = (input) => {
        setPopover(React.createElement(PopoverComponent, { ...input, close: close }));
    };
    const isOpen = popover != null;
    return (React.createElement(BaseView, { onClick: (e) => {
            e.stopPropagation();
        }, className: className, grow: grow, shrink: shrink, tag: tag, jsStyle: [jsStyle, jsStyles.trigger] },
        children({ open, close, isOpen }),
        popover));
}
//# sourceMappingURL=Popover.js.map