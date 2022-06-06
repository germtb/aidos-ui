import React from "react";
import { createJSStyles } from "./Palette";
import { ListPressableRow } from "./ListPressableRow";
import { Icon } from "./Icon";
import { BaseView } from "./BaseView";

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
}: {
  children: React.ReactNode;
  label: string;
  initialState: {
    collapsed: boolean;
  };
}) {
  const [collapsed, setCollapsed] = React.useState(initialState.collapsed);

  return (
    <>
      <ListPressableRow
        headline={label}
        onPress={() => setCollapsed((x) => !x)}
        backgroundColor="secondary-background"
        secondaryAddOn={
          <BaseView
            jsStyle={[jsStyles.icon, !collapsed && jsStyles.iconRotated]}
          >
            <Icon color="primary" size="medium" icon="fa-chevron-right" />
          </BaseView>
        }
      />
      {collapsed ? null : children}
    </>
  );
}
