import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { BaseView } from "./BaseView";
import { Text } from "./Text";
import { createClassNames, createJSStyles } from "./Palette";
import { ListDivider } from "./ListDivider";
import { Column } from "./Column";
import { Row } from "./Row";
import { IconButton } from "./IconButton";
import { queryFocusables } from "./aria";
import { useRefEffect } from "./useRefEffect";
const jsStyles = createJSStyles({
    dialog: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--divider)",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch",
        background: "rgba(0,0,0,0.1)",
        top: 0,
        border: "none",
        zIndex: 2,
    },
    root: {
        display: "grid",
        overflow: "hidden",
        maxWidth: "calc(100vw - 24px)",
        gridTemplateAreas: `
        "header"
        "content"
    `,
        "@media (min-width: 750px)": {
            minWidth: 750,
        },
        backgroundColor: "var(--secondary-background)",
        borderRadius: "var(--border-radius-m)",
        border: "none",
        margin: "auto",
        boxShadow: "0px 1px 2px var(--divider)",
    },
    header: {
        gridArea: "header",
    },
    content: {
        gridArea: "content",
    },
});
export function Dialog({ label, children, close }) {
    const activeElementRef = useRef(null);
    useEffect(() => {
        const callback = (e) => {
            if (e.key === "Escape") {
                close();
            }
        };
        window.addEventListener("keydown", callback);
        return () => {
            window.removeEventListener("keydown", callback);
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
    return (React.createElement("dialog", { open: true, ref: refCallback, className: createClassNames(jsStyles.dialog), onSubmit: (e) => {
            e.preventDefault();
        } },
        React.createElement(BaseView, { jsStyle: jsStyles.root },
            React.createElement(Column, { jsStyle: jsStyles.header },
                React.createElement(Row, { padding: "medium", justify: "space-between", align: "center" },
                    React.createElement(Text, { size: "medium", color: "secondary" }, label),
                    React.createElement(IconButton, { bare: true, icon: "fa-close", size: "medium", onPress: close, color: "secondary" })),
                React.createElement(ListDivider, null)),
            React.createElement(BaseView, { jsStyle: jsStyles.content }, children))));
}
const DialogContext = React.createContext({
    setDialog: () => { },
});
export function DialogProvider({ children }) {
    const [dialog, setDialog] = useState(null);
    const value = useMemo(() => ({ setDialog }), []);
    return (React.createElement(DialogContext.Provider, { value: value },
        dialog,
        children));
}
export function useDialog(DialogComponent) {
    const { setDialog } = useContext(DialogContext);
    const open = (input) => {
        setDialog(React.createElement(DialogComponent, { ...input, close: () => setDialog(null) }));
    };
    const close = () => {
        setDialog(null);
    };
    return {
        open,
        close,
    };
}
//# sourceMappingURL=Dialog.js.map