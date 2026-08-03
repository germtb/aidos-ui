import React, { ReactNode } from "react";

import { Card } from "../../../src/Card";
import { Material, desktop, laptop, mobile, tablet } from "../../../src/jss";

export function PreviewFrame({
  children,
  header,
  headerMaterial = "aurora",
  height,
  maxWidth,
  desktopOnly = false,
  label,
}: {
  children: ReactNode;
  header?: ReactNode;
  headerMaterial?: Material;
  height: number;
  maxWidth?: number;
  desktopOnly?: boolean;
  label: string;
}) {
  return (
    <Card
      variant="floating"
      role="group"
      aria-label={label}
      padding="none"
      gap="none"
      jss={[
        {
          width: "100%",
          maxWidth,
          height,
          margin: "0 auto",
          overflow: "hidden",
        },
        desktopOnly && mobile({ display: "none" }),
        desktopOnly && tablet({ display: "none" }),
        desktopOnly && laptop({ display: "none" }),
        desktopOnly && desktop({ display: "flex" }),
      ]}
    >
      {header != null && (
        <Card
          material={headerMaterial}
          gap="none"
          jss={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: "none",
          }}
        >
          {header}
        </Card>
      )}
      {children}
    </Card>
  );
}
