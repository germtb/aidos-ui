import React from "react";
import { ListButtonItem } from "./ListButtonItem";
import { Icon } from "./Icon";
import { Box } from "./Box";
import { Row } from "./Row";
export function Sublist({ children, label, initialState = { collapsed: false }, jsStyle, secondaryAddOn, bare, }) {
    const [collapsed, setCollapsed] = React.useState(initialState.collapsed);
    return (React.createElement(React.Fragment, null,
        React.createElement(ListButtonItem, { bare: bare, headline: label, onClick: () => setCollapsed((x) => !x), jsStyle: jsStyle, addOn: React.createElement(Row, { gap: "medium", align: "center" },
                secondaryAddOn,
                React.createElement(Box, { padding: "medium", jsStyle: [
                        {
                            transition: "transform 0.15s ease-in",
                        },
                        !collapsed && {
                            transform: "rotateZ(90deg)",
                        },
                    ] },
                    React.createElement(Icon, { color: "primary", size: "medium", icon: "fa-chevron-right" }))), addOnPosition: "end", color: "secondary" }),
        collapsed ? null : children));
}
//# sourceMappingURL=Sublist.js.map