import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BaseView } from "./BaseView";
import { Text } from "./Text";
import { Column } from "./Column";
import { Row } from "./Row";
import { IconButton } from "./IconButton";
import { toClassnames, type JSS } from "./jss";
import { useRefEffect } from "./useRefEffect";

const DialogTitleContext = createContext<string>(undefined);

export interface ModalProps {
  open: boolean;
  label?: string;
  children: ReactNode;
  onClose: () => void;
  onAfterClose?: () => void;
  closeOnOutsideClick?: boolean;
  initialFocus?: React.RefObject<HTMLElement | null>;
  jss?: JSS;
}

export function Modal({ open, ...props }: ModalProps) {
  return open ? <ModalSurface {...props} /> : null;
}

function ModalSurface({
  label,
  children,
  onClose,
  onAfterClose,
  closeOnOutsideClick = true,
  initialFocus,
  jss,
}: Omit<ModalProps, "open">) {
  const titleId = useId();
  const afterClose = useRef(onAfterClose);
  afterClose.current = onAfterClose;
  const initial = useRef(initialFocus);
  initial.current = initialFocus;
  const previous = useRef<Element>(null);
  const mount = useRefEffect(
    useCallback((element: HTMLDialogElement) => {
      if (!element.open) previous.current = document.activeElement;
      element.showModal();
      initial.current?.current?.focus({ preventScroll: true });
      return () => {
        queueMicrotask(() => {
          // Ref replay must not complete a dialog that remains mounted.
          if (element.isConnected && element.open) return;
          // Restore the editor only after removing the dialog's focused input.
          element.close();
          if (
            previous.current instanceof HTMLElement &&
            previous.current.isConnected &&
            (document.activeElement === document.body ||
              element.contains(document.activeElement))
          )
            previous.current.focus({ preventScroll: true });
          afterClose.current?.();
        });
      };
    }, []),
  );
  return (
    <dialog
      ref={mount}
      aria-label={label}
      aria-labelledby={label ? undefined : titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={(event) => {
        if (!event.currentTarget.open) onClose();
      }}
      onClick={(event) => {
        if (!closeOnOutsideClick || event.target !== event.currentTarget)
          return;
        const box = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom
        )
          onClose();
      }}
      className={toClassnames([
        {
          padding: 0,
          border: "1px solid var(--divider)",
          borderRadius: "var(--border-radius-xl)",
          background: "var(--overlay-background)",
          color: "var(--primary-text)",
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100dvh - 32px)",
          boxShadow: "var(--shadow-lg)",
          overflow: "auto",
          "::backdrop": { background: "rgba(0, 0, 0, 0.3)" },
        },
        jss,
      ])}
    >
      <DialogTitleContext.Provider value={titleId}>
        {children}
      </DialogTitleContext.Provider>
    </dialog>
  );
}

export function Dialog({
  label,
  children,
  close,
  header,
  footer,
}: {
  label: string;
  children: ReactNode;
  close: () => void;
  header?: ReactNode;
  footer?: ReactNode;
}) {
  const titleId = useContext(DialogTitleContext);
  return (
    <Column
      gap="none"
      jss={{
        width: "min(640px, calc(100vw - 34px))",
        maxHeight: "calc(100dvh - 34px)",
      }}
    >
      {header === undefined ? (
        <Row
          padding="medium"
          align="center"
          justify="space-between"
          jss={{ flexShrink: 0, borderBottom: "1px solid var(--divider)" }}
        >
          <Text id={titleId} type="h2" size="medium" bold>
            {label}
          </Text>
          <IconButton
            aria-label="Close dialog"
            size="small"
            bare
            icon="x"
            onClick={close}
            color="secondary"
          />
        </Row>
      ) : (
        header
      )}
      <BaseView jss={{ minHeight: 0, overflowY: "auto" }}>{children}</BaseView>
      {footer && (
        <Row
          padding="large"
          gap="small"
          justify="flex-end"
          jss={{ flexShrink: 0, borderTop: "1px solid var(--divider)" }}
        >
          {footer}
        </Row>
      )}
    </Column>
  );
}

const DialogContext = createContext<{
  setDialog: React.Dispatch<React.SetStateAction<ReactNode>>;
}>({ setDialog: () => {} });

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<ReactNode>(null);
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
  options: { closeOnOutsideClick: boolean; label?: string },
) {
  const { setDialog } = useContext(DialogContext);
  const close = useCallback(() => setDialog(null), [setDialog]);
  const open = (input: Input) =>
    setDialog(
      <Modal
        open
        label={options.label}
        onClose={close}
        closeOnOutsideClick={options.closeOnOutsideClick}
      >
        <DialogComponent {...input} close={close} />
      </Modal>,
    );
  return { open, close };
}
