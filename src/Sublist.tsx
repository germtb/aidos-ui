import React, { useId, useState } from "react";
import { ListButtonItem } from "./ListButtonItem";
import { Disclosure } from "./Disclosure";
import { BaseList } from "./BaseList";
import { JSS } from "./jss";

export function Sublist({
  children,
  label,
  labelBold,
  initialState = { collapsed: false },
  expanded: controlledExpanded,
  onExpandedChange,
  jss,
}: {
  children: React.ReactNode;
  label: string;
  labelBold?: boolean;
  initialState?: { collapsed: boolean };
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  jss?: JSS;
}) {
  const [localExpanded, setExpanded] = useState(!initialState.collapsed);
  const expanded = controlledExpanded ?? localExpanded;
  const id = useId();
  return (
    <>
      <ListButtonItem
        headline={label}
        headlineBold={labelBold}
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => {
          if (controlledExpanded === undefined) setExpanded(!expanded);
          onExpandedChange?.(!expanded);
        }}
        jss={jss}
        icon="chevron-right"
        iconPosition="end"
        iconJss={{
          transition: "transform 180ms ease",
          transform: expanded ? "rotateZ(90deg)" : "none",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
        color="secondary"
      />
      <Disclosure id={id} tag="li" role="rowgroup" expanded={expanded}>
        <BaseList role="presentation">{children}</BaseList>
      </Disclosure>
    </>
  );
}
