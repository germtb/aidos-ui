import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useMemo, useRef, useState } from "react";
import { BaseView } from "./BaseView";
import { Text } from "./Text";
import { ListDivider } from "./ListDivider";
import { Column } from "./Column";
import { Row } from "./Row";
import { IconButton } from "./IconButton";
import { jss } from "./jss";
const jsStyles = {
    dialog: {
        border: "1px solid var(--divider)",
        borderRadius: "var(--border-radius-m)",
        padding: 0,
    },
    root: {
        display: "grid",
        width: "calc(100vw - 48px)",
        gridTemplateAreas: `
        "header"
        "content"
    `,
        "@media (min-width: 750px)": {
            maxWidth: 750,
        },
        backgroundColor: "var(--secondary-background)",
    },
    header: {
        gridArea: "header",
    },
    content: {
        gridArea: "content",
    },
};
export const Dialog = ({ label, children, close, }) => {
    return (_jsxs(BaseView, { jsStyle: jsStyles.root, children: [_jsxs(Column, { jsStyle: jsStyles.header, children: [_jsxs(Row, { padding: "medium", justify: "space-between", align: "center", children: [_jsx(Text, { size: "medium", color: "secondary", children: label }), _jsx(IconButton, { autoFocus: true, bare: true, icon: "fa-close", size: "medium", onClick: close, color: "secondary" })] }), _jsx(ListDivider, {})] }), _jsx(BaseView, { jsStyle: jsStyles.content, children: children })] }));
};
const DialogContext = React.createContext({
    setDialog: () => { },
});
export function DialogProvider({ children }) {
    const [dialog, setDialog] = useState(null);
    const value = useMemo(() => ({ setDialog }), []);
    return (_jsxs(DialogContext.Provider, { value: value, children: [dialog, children] }));
}
export function useDialog(DialogComponent, options) {
    const { setDialog } = useContext(DialogContext);
    const dialogRef = useRef(null);
    const activeElementRef = useRef(null);
    const closeRef = useRef(null);
    closeRef.current = () => {
        dialogRef.current && dialogRef.current.close();
        activeElementRef.current && activeElementRef.current.focus();
        dialogRef.current = null;
        activeElementRef.current = null;
        setDialog(null);
    };
    const open = (input) => {
        activeElementRef.current = document.activeElement;
        setDialog(_jsx("dialog", { ref: (ref) => {
                dialogRef.current = ref;
                ref && ref.showModal();
            }, className: jss(jsStyles.dialog), onClose: () => {
                closeRef.current();
            }, onClick: (e) => {
                if (dialogRef.current == null) {
                    return;
                }
                const dialogDimensions = dialogRef.current.getBoundingClientRect();
                if (options.closeOnOutsideClick === false) {
                    return;
                }
                if (e.clientX < dialogDimensions.left ||
                    e.clientX > dialogDimensions.right ||
                    e.clientY > dialogDimensions.bottom ||
                    e.clientY < dialogDimensions.top) {
                    dialogRef.current.close();
                }
            }, children: _jsx(DialogComponent, { ...input, close: () => closeRef.current() }) }));
    };
    return {
        open,
        close: () => closeRef.current(),
    };
}
//# sourceMappingURL=Dialog.js.map