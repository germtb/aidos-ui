import React, { ReactNode } from "react";
import { ListPressableRow } from "./ListPressableRow";
import { Icon } from "./Icon";
import { Box } from "./Box";
import { Row } from "./Row";
import { JSStyle } from "./JSS";

const jsStyles = {
  icon: {
    transition: "transform 0.15s ease-in",
  },
  iconRotated: {
    transform: "rotateZ(90deg)",
  },
};

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
  jsStyle?: JSStyle;
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
