import React from "react";
import { ListButtonItem } from "./ListButtonItem";
import { JSS } from "./jss";

export function Sublist({
  children,
  label,
  labelBold,
  initialState = { collapsed: false },
  jss,
}: {
  children: React.ReactNode;
  label: string;
  labelBold?: boolean;
  initialState?: {
    collapsed: boolean;
  };
  jss?: JSS;
}) {
  const [collapsed, setCollapsed] = React.useState(initialState.collapsed);
  return (
    <>
      <ListButtonItem
        headline={label}
        headlineBold={labelBold}
        onClick={() => setCollapsed((x) => !x)}
        jss={jss}
        icon="chevron-right"
        iconPosition="end"
        iconJss={{
          transition: "transform 0.15s ease-in",
          ...(!collapsed && { transform: "rotateZ(90deg)" }),
        }}
        color="secondary"
      />
      {collapsed ? null : children}
    </>
  );
}
