import React, { useContext, useMemo, useRef, useState } from "react";
import { BaseView } from "./BaseView";
import { Text } from "./Text";
import { createClassNames, createJSStyle } from "./Styles";
import { ListDivider } from "./ListDivider";
import { Column } from "./Column";
import { Row } from "./Row";
import { IconButton } from "./IconButton";
const jsStyles = createJSStyle({
    dialog: {
        border: "1px solid var(--divider)",
        borderRadius: "var(--border-radius-m)",
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
        setDialog(React.createElement("dialog", { ref: (ref) => {
                dialogRef.current = ref;
                ref && ref.showModal();
            }, className: createClassNames(jsStyles.dialog), onClose: () => {
                closeRef.current();
            }, onClick: (e) => {
                if (dialogRef.current == null) {
                    return;
                }
                const dialogDimensions = dialogRef.current.getBoundingClientRect();
                if (e.clientX < dialogDimensions.left ||
                    e.clientX > dialogDimensions.right ||
                    e.clientY > dialogDimensions.bottom ||
                    e.clientY < dialogDimensions.top) {
                    dialogRef.current.close();
                }
            } },
            React.createElement(DialogComponent, { ...input, close: () => closeRef.current() })));
    };
    return {
        open,
        close: () => closeRef.current(),
    };
}
//# sourceMappingURL=Dialog.js.map