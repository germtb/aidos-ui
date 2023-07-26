import React, { ReactNode } from "react";
import { ListButtonItem } from "./ListButtonItem";
import { Icon } from "./Icon";
import { Box } from "./Box";
import { Row } from "./Row";
import { JSStyle } from "./jss";

export function Sublist({
  children,
  label,
  labelBold,
  initialState = { collapsed: false },
  jsStyle,
  secondaryAddOn,
  bare,
}: {
  bare?: boolean;
  children: React.ReactNode;
  label: string;
  labelBold?: boolean;
  initialState?: {
    collapsed: boolean;
  };
  jsStyle?: JSStyle;
  secondaryAddOn?: ReactNode;
}) {
  const [collapsed, setCollapsed] = React.useState(initialState.collapsed);

  return (
    <>
      <ListButtonItem
        bare={bare}
        headline={label}
        headlineBold={labelBold}
        onClick={() => setCollapsed((x) => !x)}
        jsStyle={jsStyle}
        addOn={
          <Row gap="medium" align="center">
            {secondaryAddOn}
            <Box
              padding="medium"
              jsStyle={[
                {
                  transition: "transform 0.15s ease-in",
                },
                !collapsed && {
                  transform: "rotateZ(90deg)",
                },
              ]}
            >
              <Icon
                color="primary"
                size="medium"
                icon="fa-solid:chevron-right"
              />
            </Box>
          </Row>
        }
        addOnPosition="end"
        color="secondary"
      />
      {collapsed ? null : children}
    </>
  );
}
