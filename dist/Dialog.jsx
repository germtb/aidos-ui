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
    return (<BaseView jsStyle={jsStyles.root}>
      <Column jsStyle={jsStyles.header}>
        <Row padding="medium" justify="space-between" align="center">
          <Text size="medium" color="secondary">
            {label}
          </Text>
          <IconButton autoFocus={true} bare={true} icon="fa-close" size="medium" onClick={close} color="secondary"/>
        </Row>
        <ListDivider />
      </Column>
      <BaseView jsStyle={jsStyles.content}>{children}</BaseView>
    </BaseView>);
};
const DialogContext = React.createContext({
    setDialog: () => { },
});
export function DialogProvider({ children }) {
    const [dialog, setDialog] = useState(null);
    const value = useMemo(() => ({ setDialog }), []);
    return (<DialogContext.Provider value={value}>
      {dialog}
      {children}
    </DialogContext.Provider>);
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
        setDialog(<dialog ref={(ref) => {
                dialogRef.current = ref;
                ref && ref.showModal();
            }} className={jss(jsStyles.dialog)} onClose={() => {
                closeRef.current();
            }} onClick={(e) => {
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
            }}>
        <DialogComponent {...input} close={() => closeRef.current()}/>
      </dialog>);
    };
    return {
        open,
        close: () => closeRef.current(),
    };
}
//# sourceMappingURL=Dialog.jsx.map