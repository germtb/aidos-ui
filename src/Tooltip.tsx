import React, { useRef, useState } from "react";

import { BaseView } from "./BaseView";
import { useRefEffect } from "./useRefEffect";
import { Text } from "./Text";
import { JSStyle, jss } from "./JSS";

const jsStyles: { [key: string]: JSStyle } = {
  root: {
    position: "relative",
  },
  tooltip: {
    top: "-100%",
    transform: "translateY(50%)",
    background: "var(--primary-background)",
    padding: "var(--spacing-s)",
    borderRadius: "var(--border-radius-m)",
    border: "1px solid var(--divider)",
    boxShadow: "0px 1px 2px var(--divider)",
    overflow: "hidden",
  },
};

interface TooltipProps {
  content: string;
  jsStyle?: JSStyle;
  className?: undefined;
  grow?: boolean;
  shrink?: boolean;
  tag?: keyof HTMLElementTagNameMap;
  children: JSX.Element;
}

export function Tooltip({
  content,
  jsStyle,
  grow,
  shrink,
  tag,
  children,
}: TooltipProps) {
  const [tooltip, setTooltip] = useState<JSX.Element>(null);
  const dialogRef = useRef(null);
  const focusTrapRoot = useRefEffect((root: HTMLDialogElement) => {
    dialogRef.current = root;

    const keydown = (e) => {
      if (e.key === "Escape") {
        dialogRef.current?.close();
      } else if (e.key === "Tab") {
        dialogRef.current?.close();
      }
    };

    const click = () => {
      dialogRef.current?.close();
    };

    window.addEventListener("keydown", keydown);
    window.addEventListener("click", click);

    const activeElement = document.activeElement;
    root.show();
    // @ts-ignore
    activeElement.focus();

    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("click", click);
    };
  });

  const toggle = () => {
    if (tooltip == null) {
      setTooltip(
        <dialog
          ref={(ref: null | HTMLDialogElement) => {
            dialogRef.current = ref;
            focusTrapRoot(ref);
          }}
          className={jss(jsStyles.tooltip)}
          onClose={() => {
            setTooltip(null);
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Text size="medium" color="secondary">
            {content}
          </Text>
        </dialog>
      );
    } else {
      setTooltip(null);
    }
  };

  return (
    <BaseView
      grow={grow}
      shrink={shrink}
      tag={tag}
      relative={true}
      jsStyle={[jsStyle, jsStyles.root]}
      onMouseEnter={() => {
        if (tooltip == null) {
          toggle();
        }
      }}
      onMouseLeave={() => {
        if (tooltip != null) {
          toggle();
        }
      }}
    >
      {children}
      {tooltip}
    </BaseView>
  );
}
