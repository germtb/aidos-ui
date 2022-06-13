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
    gridTemplateAreas: `
        "header"
        "content"
    `,
    gridTemplateRows: "min-content auto min-content",
    gridTemplateColumns: "auto",
    "@media (min-width: 0px) and (max-width: 750px)": {
      width: "calc(100vw - 24px)",
    },
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

  const refCallback = useRefEffect((root: HTMLElement) => {
    activeElementRef.current = document.activeElement;
    const [element] = queryFocusables(root);
    element && element.focus();

    const onKeyDown = (e) => {
      const elements = queryFocusables(root);
      if (elements.length === 0) {
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.code === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
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

  return (
    <dialog ref={refCallback} className={createClassNames(jsStyles.dialog)}>
      <BaseView jsStyle={jsStyles.root}>
        <Column jsStyle={jsStyles.header}>
          <Row padding="medium" justify="space-between" align="center">
            <Text size="medium" color="secondary">
              {label}
            </Text>
            <IconButton
              bare={true}
              icon="fa-close"
              size="small"
              onPress={close}
              color="secondary"
            />
          </Row>
          <ListDivider />
        </Column>
        <BaseView jsStyle={jsStyles.content}>{children}</BaseView>
      </BaseView>
    </dialog>
  );
}

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

  const open = (input: Input) => {
    setDialog(<DialogComponent {...input} close={() => setDialog(null)} />);
  };

  const close = () => {
    setDialog(null);
  };

  return {
    open,
    close,
  };
}
