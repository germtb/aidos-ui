import React from "react";
import { ListPressableRow } from "./ListPressableRow";
import { Icon } from "./Icon";
import { Box } from "./Box";
import { Row } from "./Row";
export function Sublist({ children, label, initialState = { collapsed: false }, jsStyle, secondaryAddOn, }) {
    const [collapsed, setCollapsed] = React.useState(initialState.collapsed);
    return (<>
      <ListPressableRow headline={label} onClick={() => setCollapsed((x) => !x)} jsStyle={jsStyle} addOn={<Row gap="medium" align="center">
            {secondaryAddOn}
            <Box padding="medium" jsStyle={[
                {
                    transition: "transform 0.15s ease-in",
                },
                !collapsed && {
                    transform: "rotateZ(90deg)",
                },
            ]}>
              <Icon color="primary" size="medium" icon="fa-chevron-right"/>
            </Box>
          </Row>} addOnPosition="end"/>
      {collapsed ? null : children}
    </>);
}
//# sourceMappingURL=Sublist.jsx.map