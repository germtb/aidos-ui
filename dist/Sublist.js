import React from "react";
import { createJSStyles } from "./Palette";
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
export function Sublist({ children, label, initialState = { collapsed: false }, jsStyle, secondaryAddOn, }) {
    const [collapsed, setCollapsed] = React.useState(initialState.collapsed);
    return (React.createElement(React.Fragment, null,
        React.createElement(ListPressableRow, { headline: label, onPress: () => setCollapsed((x) => !x), jsStyle: jsStyle, addOn: React.createElement(Row, { gap: "medium", align: "center" },
                secondaryAddOn,
                React.createElement(Box, { padding: "medium", jsStyle: [jsStyles.icon, !collapsed && jsStyles.iconRotated] },
                    React.createElement(Icon, { color: "primary", size: "medium", icon: "fa-chevron-right" }))), addOnPosition: "right" }),
        collapsed ? null : children));
}
//# sourceMappingURL=Sublist.js.map