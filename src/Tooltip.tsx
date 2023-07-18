import React, { useRef, useState } from "react";

import { BaseView } from "./BaseView";
import { useRefEffect } from "./useRefEffect";
import { Text } from "./Text";
import { JSStyle, cssVar, jss } from "./jss";

const jsStyles: { [key: string]: JSStyle } = {
  tooltip: {
    top: "-100%",
    transform: "translateY(50%)",
    background: cssVar("--primary-background"),
    padding: cssVar("--spacing-s"),
    borderRadius: cssVar("--border-radius-m"),
    border: `1px solid ${cssVar("--divider")}`,
    boxShadow: `0px 1px 2px ${cssVar("--divider")}`,
    overflow: "hidden",
  },
};

interface TooltipProps {
  content: string;
  jsStyle?: JSStyle;
  className?: undefined;
  tag?: keyof HTMLElementTagNameMap;
  children: JSX.Element;
}

export function Tooltip({ content, jsStyle, tag, children }: TooltipProps) {
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
      tag={tag}
      relative={true}
      jsStyle={[{ display: "inline-block" }, jsStyle]}
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
