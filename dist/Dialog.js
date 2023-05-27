import React, { useContext, useMemo, useRef, useState } from "react";
import { BaseView } from "./BaseView";
import { Text } from "./Text";
import { createClassNames, createJSStyles } from "./Palette";
import { ListDivider } from "./ListDivider";
import { Column } from "./Column";
import { Row } from "./Row";
import { IconButton } from "./IconButton";
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
        width: "calc(100vw - 24px)",
        gridTemplateAreas: `
        "header"
        "content"
    `,
        "@media (min-width: 750px)": {
            maxWidth: 750,
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
export const Dialog = ({ label, children, close, }) => {
    return (React.createElement(BaseView, { jsStyle: jsStyles.root },
        React.createElement(Column, { jsStyle: jsStyles.header },
            React.createElement(Row, { padding: "medium", justify: "space-between", align: "center" },
                React.createElement(Text, { size: "medium", color: "secondary" }, label),
                React.createElement(IconButton, { autoFocus: true, bare: true, icon: "fa-close", size: "medium", onPress: close, color: "secondary" })),
            React.createElement(ListDivider, null)),
        React.createElement(BaseView, { jsStyle: jsStyles.content }, children)));
};
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
        console.log({ activeElementRef });
        setDialog(React.createElement("dialog", { ref: (ref) => {
                dialogRef.current = ref;
                ref && ref.showModal();
            }, className: createClassNames(jsStyles.dialog) },
            React.createElement(DialogComponent, { ...input, close: () => closeRef.current() })));
    };
    return {
        open,
        close: () => closeRef.current(),
    };
}
//# sourceMappingURL=Dialog.js.map