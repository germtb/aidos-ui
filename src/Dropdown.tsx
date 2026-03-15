import React, { useEffect, useId, useRef, useState } from "react";

import { BaseView } from "./BaseView";
import { Button } from "./Button";
import { Column } from "./Column";
import { useNavigation } from "./useNavigation";
import { useRefEffect } from "./useRefEffect";
import { Gap, JSS, Padding, Size, getBackground } from "./jss";

const jsss: { [key: string]: JSS } = {
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexGrow: 1,
  },
  button: {
    flexGrow: 1,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    borderRadius: "var(--border-radius-m)",
    boxShadow: "var(--shadow-sm)",
    zIndex: 1,
  },
};
export function Dropdown<T extends string | number>({
  id: propId,
  label,
  options,
  selection,
  setSelection,
  jss,
  jssButton,
  optionLabel,
  padding,
  size,
  gap = "medium",
}: {
  id?: string;
  label: string;
  options: Set<T>;
  setSelection: (selection: T) => void;
  selection: T;
  jss?: JSS;
  jssButton?: JSS;
  optionLabel: (option: T) => string;
  padding?: Padding;
  gap?: Gap;
  size?: Size;
}) {
  const hookId = useId();
  const id = propId ?? hookId;
  const triggerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useNavigation({ autofocus: true });
  const rootRef = useRefEffect<HTMLElement>((root) => {
    const onKeyDown = (e) => {
      if (e.code === "Escape") {
        setExpanded(false);
      }
    };

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    if (!expanded) {
      triggerRef.current && triggerRef.current.focus();
    }
  }, [expanded]);

  return (
    <BaseView ref={rootRef} jss={[jsss.root, jss]}>
      <Button
        size={size}
        padding={padding}
        aria-expanded={expanded ? "true" : "false"}
        aria-controls={id}
        aria-haspopup="true"
        aria-label={label}
        role="combobox"
        justify="space-between"
        tabIndex={0}
        jss={[jsss.button, jssButton]}
        color="positive"
        icon="fa-chevron-down"
        iconPosition="right"
        onClick={() => {
          setExpanded((x) => !x);
        }}
        ref={triggerRef}
      >
        {optionLabel(selection)}
      </Button>
      {expanded && (
        <Column
          gap={gap}
          jss={[jsss.dropdown, getBackground("secondary-background")]}
          id={id}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          ref={dropdownRef}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setExpanded(false);
            }
          }}
        >
          {Array.from(options).map((option, index) => {
            const optionId = `${id}-${index}`;
            const selected = option === selection;
            return (
              <Button
                size={size}
                padding={padding}
                justify={selected ? "space-between" : "flex-start"}
                align="center"
                bare={true}
                iconPosition="right"
                icon={selected ? "fa-check" : undefined}
                key={optionId}
                role="option"
                id={optionId}
                aria-selected={selected ? "true" : "false"}
                color="positive"
                onClick={() => {
                  setSelection(option);
                  setExpanded(false);
                }}
              >
                {optionLabel(option)}
              </Button>
            );
          })}
        </Column>
      )}
    </BaseView>
  );
}
