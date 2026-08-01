import React, { useCallback, useContext, useMemo, useRef, useState } from "react";

import { BaseView } from "./BaseView";
import { Text } from "./Text";
import { ListDivider } from "./ListDivider";
import { Column } from "./Column";
import { Row } from "./Row";
import { IconButton } from "./IconButton";
import { toClassnames } from "./jss";

const styles = {
  dialog: {
    border: "1px solid var(--divider)",
    borderRadius: "var(--border-radius-l)",
    padding: 0,
    boxShadow: "var(--shadow-lg)",
    animation: "dialogFadeIn 0.2s ease-out",
    "::backdrop": {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      animation: "backdropFadeIn 0.2s ease-out",
    },
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

export const Dialog = ({
  label,
  children,
  close,
}: {
  label: string;
  children: React.JSX.Element;
  close: () => void;
}) => {
  return (
    <BaseView jss={styles.root}>
      <Column jss={styles.header}>
        <Row padding="medium" justify="space-between" align="center">
          <Text size="medium" color="secondary">
            {label}
          </Text>
          <IconButton
            autoFocus={true}
            bare={true}
            icon="x"
            onClick={close}
            color="secondary"
          />
        </Row>
        <ListDivider />
      </Column>
      <BaseView jss={styles.content}>{children}</BaseView>
    </BaseView>
  );
};

type DialogElement = React.JSX.Element | null;

const DialogContext = React.createContext<{
  setDialog: React.Dispatch<React.SetStateAction<DialogElement>>;
}>({
  setDialog: () => {},
});

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DialogElement>(null);
  const value = useMemo(() => ({ setDialog }), []);

  return (
    <DialogContext.Provider value={value}>
      {dialog}
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog<Input>(
  DialogComponent: (props: { close: () => void } & Input) => React.JSX.Element,
  options: { closeOnOutsideClick: boolean },
) {
  const { setDialog } = useContext(DialogContext);
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    dialogRef.current?.close();
    activeElementRef.current?.focus();
    dialogRef.current = null;
    activeElementRef.current = null;
    setDialog(null);
  }, [setDialog]);

  const open = (input: Input) => {
    activeElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setDialog(
      <dialog
        ref={(ref: null | HTMLDialogElement) => {
          dialogRef.current = ref;
          ref?.showModal();
        }}
        className={toClassnames(styles.dialog)}
        onClose={() => {
          close();
        }}
        onClick={(e) => {
          if (dialogRef.current == null) {
            return;
          }

          const dialogDimensions = dialogRef.current.getBoundingClientRect();

          if (options.closeOnOutsideClick === false) {
            return;
          }

          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY > dialogDimensions.bottom ||
            e.clientY < dialogDimensions.top
          ) {
            dialogRef.current.close();
          }
        }}
      >
        <DialogComponent {...input} close={close} />
      </dialog>,
    );
  };

  return {
    open,
    close,
  };
}
