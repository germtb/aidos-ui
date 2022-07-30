import React from "react";
import { createJSStyles } from "./Palette";
import { ListPressableRow } from "./ListPressableRow";
import { Icon } from "./Icon";
import { Box } from "./Box";
const jsStyles = createJSStyles({
    icon: {
        transition: "transform 0.15s ease-in",
    },
    iconRotated: {
        transform: "rotateZ(90deg)",
    },
});
export function Sublist({ children, label, initialState, jsStyle, }) {
    const [collapsed, setCollapsed] = React.useState(initialState.collapsed);
    return (React.createElement(React.Fragment, null,
        React.createElement(ListPressableRow, { headline: label, onPress: () => setCollapsed((x) => !x), jsStyle: jsStyle, secondaryAddOn: React.createElement(Box, { padding: "medium", jsStyle: [jsStyles.icon, !collapsed && jsStyles.iconRotated] },
                React.createElement(Icon, { color: "primary", size: "medium", icon: "fa-chevron-right" })) }),
        collapsed ? null : children));
}
