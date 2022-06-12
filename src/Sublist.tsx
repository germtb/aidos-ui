import React from "react";
import { background, createJSStyles, JSStyles } from "./Palette";
import { ListPressableRow } from "./ListPressableRow";
import { Icon } from "./Icon";
import { BaseView } from "./BaseView";
import { Box } from "./Box";

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
  initialState,
  jsStyle,
}: {
  children: React.ReactNode;
  label: string;
  initialState: {
    collapsed: boolean;
  };
  jsStyle?: JSStyles;
}) {
  const [collapsed, setCollapsed] = React.useState(initialState.collapsed);

  return (
    <>
      <ListPressableRow
        headline={label}
        onPress={() => setCollapsed((x) => !x)}
        jsStyle={jsStyle}
        secondaryAddOn={
          <Box
            spacing="medium"
            jsStyle={[jsStyles.icon, !collapsed && jsStyles.iconRotated]}
          >
            <Icon color="primary" size="medium" icon="fa-chevron-right" />
          </Box>
        }
      />
      {collapsed ? null : children}
    </>
  );
}
