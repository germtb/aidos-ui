import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { ListButtonItem } from "./ListButtonItem";
import { Icon } from "./Icon";
import { Box } from "./Box";
import { Row } from "./Row";
export function Sublist({ children, label, labelBold, initialState = { collapsed: false }, jsStyle, secondaryAddOn, }) {
    const [collapsed, setCollapsed] = React.useState(initialState.collapsed);
    return (_jsxs(_Fragment, { children: [_jsx(ListButtonItem, { headline: label, headlineBold: labelBold, onClick: () => setCollapsed((x) => !x), jsStyle: jsStyle, addOn: _jsxs(Row, { gap: "medium", align: "center", children: [secondaryAddOn, _jsx(Box, { padding: "medium", jsStyle: [
                                {
                                    transition: "transform 0.15s ease-in",
                                },
                                !collapsed && {
                                    transform: "rotateZ(90deg)",
                                },
                            ], children: _jsx(Icon, { color: "primary", size: "medium", icon: "fa-solid:chevron-right" }) })] }), addOnPosition: "end", color: "primary" }), collapsed ? null : children] }));
}
//# sourceMappingURL=Sublist.js.map