import React, { useEffect, useRef, useState } from "react";

import { BaseView } from "./BaseView";
import { createJSStyles, JSStyles } from "./Palette";
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

    // This is needed so that the trigger click is not captured immediatly, which would close the popover as it opens
    setTimeout(() => {
      window.addEventListener("keydown", keydown);
      window.addEventListener("click", click);
    }, 0);

    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("click", click);
      activeElementRef.current && activeElementRef.current.focus();
      activeElementRef.current = document.activeElement;
    };
  }, []);

  const refCallback = useRefEffect((root: HTMLDialogElement) => {
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
    <BaseView ref={refCallback} jsStyle={jsStyles.popover}>
      {children}
    </BaseView>
  );
}

interface PopoverTriggerProps<Input> {
  PopoverComponent: (props: { close: () => void } & Input) => JSX.Element;
  jsStyle?: JSStyles;
  className?: undefined;
  grow?: boolean;
  shrink?: boolean;
  tag?: keyof HTMLElementTagNameMap;
  children: (props: {
    open: (input: Input) => void;
    close: () => void;
    isOpen: boolean;
  }) => JSX.Element;
}

export function PopoverTrigger<Input>({
  PopoverComponent,
  jsStyle,
  className,
  grow,
  shrink,
  tag,
  children,
}: PopoverTriggerProps<Input>) {
  const [popover, setPopover] = useState<JSX.Element>(null);

  const close = () => {
    setPopover(null);
  };

  const open = (input: Input) => {
    setPopover(<PopoverComponent {...input} close={close} />);
  };

  const isOpen = popover != null;

  return (
    <BaseView
      style={{ position: "relative" }}
      // onClick={(e) => {
      //   e.stopPropagation();
      // }}
      className={className}
      grow={grow}
      shrink={shrink}
      tag={tag}
      relative={true}
      jsStyle={jsStyle}
    >
      {children({ open, close, isOpen })}
      {popover}
    </BaseView>
  );
}
