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

export const Dialog = ({
  label,
  children,
  close,
}: {
  label: string;
  children: JSX.Element;
  close: () => void;
}) => {
  return (
    <BaseView jsStyle={jsStyles.root}>
      <Column jsStyle={jsStyles.header}>
        <Row padding="medium" justify="space-between" align="center">
          <Text size="medium" color="secondary">
            {label}
          </Text>
          <IconButton
            autoFocus={true}
            bare={true}
            icon="fa-close"
            size="medium"
            onPress={close}
            color="secondary"
          />
        </Row>
        <ListDivider />
      </Column>
      <BaseView jsStyle={jsStyles.content}>{children}</BaseView>
    </BaseView>
  );
};

const DialogContext = React.createContext<{ setDialog: React.Dispatch<any> }>({
  setDialog: () => {},
});

export function DialogProvider({ children }) {
  const [dialog, setDialog] = useState<JSX.Element>(null);
  const value = useMemo(() => ({ setDialog }), []);

  return (
    <DialogContext.Provider value={value}>
      {dialog}
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog<Input>(
  DialogComponent: (props: { close: () => void } & Input) => JSX.Element
) {
  const { setDialog } = useContext(DialogContext);
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const activeElementRef = useRef(null);
  const closeRef = useRef(null);

  closeRef.current = () => {
    dialogRef.current && dialogRef.current.close();
    activeElementRef.current && activeElementRef.current.focus();
    dialogRef.current = null;
    activeElementRef.current = null;
    setDialog(null);
  };

  const open = (input: Input) => {
    activeElementRef.current = document.activeElement;
    console.log({ activeElementRef });
    setDialog(
      <dialog
        ref={(ref: null | HTMLDialogElement) => {
          dialogRef.current = ref;
          ref && ref.showModal();
        }}
        className={createClassNames(jsStyles.dialog)}
      >
        <DialogComponent {...input} close={() => closeRef.current()} />
      </dialog>
    );
  };

  return {
    open,
    close,
  };
}
