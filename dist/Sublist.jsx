import React from "react";
import { ListButtonItem } from "./ListButtonItem";
import { Icon } from "./Icon";
import { Box } from "./Box";
import { Row } from "./Row";
export function Sublist({ children, label, labelBold, initialState = { collapsed: false }, jss, secondaryAddOn, }) {
    const [collapsed, setCollapsed] = React.useState(initialState.collapsed);
    return (<>
      <ListButtonItem headline={label} headlineBold={labelBold} onClick={() => setCollapsed((x) => !x)} jss={jss} addOn={<Row gap="medium" align="center">
            {secondaryAddOn}
            <Box padding="medium" jss={[
                {
                    transition: "transform 0.15s ease-in",
                },
                !collapsed && {
                    transform: "rotateZ(90deg)",
                },
            ]}>
              <Icon color="primary" size="medium" icon="fa-solid:chevron-right"/>
            </Box>
          </Row>} addOnPosition="end" color="primary"/>
      {collapsed ? null : children}
    </>);
}
//# sourceMappingURL=Sublist.jsx.map