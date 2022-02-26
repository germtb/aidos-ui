import React, { ReactNode, useState } from "react";
import { createJSStyles } from "./Palette";
import ListPressableRow from "./ListPressableRow";
import Icon from "./Icon";
import BaseView from "./BaseView";

const jsStyles = createJSStyles({
  icon: {
    transition: "transform 0.15s ease-in",
  },
  iconRotated: {
    transform: "rotateZ(90deg)",
  },
});

export default function Sublist({
  children,
  label,
  initialState,
}: {
  children: ReactNode;
  label: string;
  initialState: {
    collapsed: boolean;
  };
}) {
  const [collapsed, setCollapsed] = useState(initialState.collapsed);

  return (
    <>
      <ListPressableRow
        headline={label}
        onPress={() => setCollapsed((x) => !x)}
        background="secondary"
        secondaryAddOn={
          <BaseView
            jsStyle={[jsStyles.icon, !collapsed && jsStyles.iconRotated]}
          >
            <Icon color="primary" size="medium" icon="chevron-right" />
          </BaseView>
        }
      />
      {collapsed ? null : children}
    </>
  );
}
