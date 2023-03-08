import React, { ReactNode } from "react";
import { createJSStyles, JSStyles, Color, TextColor } from "./Palette";
import { ListPressableRow } from "./ListPressableRow";
import { Icon } from "./Icon";
import { Box } from "./Box";
import { Row } from "./Row";

const jsStyles = createJSStyles({
  icon: {
    transition: "transform 0.15s ease-in",
  },
  iconRotated: {
    transform: "rotateZ(90deg)",
  },
});

export function Sublist({
  children,
  label,
  initialState = { collapsed: false },
  jsStyle,
  secondaryAddOn,
}: {
  children: React.ReactNode;
  label: string;
  initialState?: {
    collapsed: boolean;
  };
  jsStyle?: JSStyles;
  secondaryAddOn?: ReactNode;
}) {
  const [collapsed, setCollapsed] = React.useState(initialState.collapsed);

  return (
    <>
      <ListPressableRow
        headline={label}
        onPress={() => setCollapsed((x) => !x)}
        jsStyle={jsStyle}
        addOn={
          <Row gap="medium" align="center">
            {secondaryAddOn}
            <Box
              padding="medium"
              jsStyle={[jsStyles.icon, !collapsed && jsStyles.iconRotated]}
            >
              <Icon color="primary" size="medium" icon="fa-chevron-right" />
            </Box>
          </Row>
        }
        addOnPosition="right"
      />
      {collapsed ? null : children}
    </>
  );
}
