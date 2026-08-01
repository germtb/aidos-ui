import React from "react";

import { Card, type CardProps } from "./Card";
import { JSS, cssVar, toClassnames } from "./jss";

export interface TableProps
  extends
    Omit<React.TableHTMLAttributes<HTMLTableElement>, "className">,
    Pick<CardProps, "variant" | "material" | "padding" | "gap"> {
  jss?: JSS;
  jssTable?: JSS;
  className?: undefined;
}

const styles: { [key: string]: JSS } = {
  root: {
    overflowX: "auto",
    overflowY: "hidden",
    " thead": {
      backgroundColor: cssVar("--secondary-background"),
    },
    " th": {
      padding: "10px 12px",
      color: cssVar("--secondary-text"),
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.02em",
      lineHeight: 1.4,
      textAlign: "left",
    },
    " td": {
      padding: "11px 12px",
      color: cssVar("--secondary-text"),
      lineHeight: 1.45,
    },
    " tbody tr": {
      transition: `background-color ${cssVar("--transition-fast")}`,
    },
    " tbody tr:hover": {
      backgroundColor: cssVar("--hovered-background"),
    },
    " tbody tr:not(:last-child) td": {
      borderBottom: `1px solid ${cssVar("--divider")}`,
    },
  },
  table: {
    width: "100%",
    minWidth: 560,
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: 14,
  },
};

export function Table({
  children,
  jss,
  jssTable,
  variant = "default",
  material,
  padding = "none",
  gap = "none",
  ...tableProps
}: TableProps) {
  return (
    <Card
      variant={variant}
      material={material}
      padding={padding}
      gap={gap}
      jss={[styles.root, jss]}
    >
      <table {...tableProps} className={toClassnames([styles.table, jssTable])}>
        {children}
      </table>
    </Card>
  );
}
