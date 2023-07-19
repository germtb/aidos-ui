import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { ListDivider } from "./ListDivider";
import { Row } from "./Row";
import { cssVar } from "./jss";
import { TextPairing } from "./TextPairing";
import { BaseView } from "./BaseView";
export const BaseListItem = React.forwardRef(({ children, jsStyle, withDivider = true, headline, headlineSize = "medium", headlineColor = "primary", headlineAddOn, body, bodySize = "small", bodyColor = "secondary", addOn, addOnPosition, outerAddOn, disabled = false, padding = "medium", gap = "medium", selected, bare, headlineBold, ...otherProps }, ref) => {
    const content = (_jsx(TextPairing, { headlineBold: headlineBold, padding: padding, gap: gap, addOn: addOn, addOnPosition: addOnPosition, headline: headline, headlineSize: headlineSize, headlineColor: disabled ? "subtle" : bare && selected ? "highlight" : headlineColor, headlineAddOn: headlineAddOn, body: body, bodySize: bodySize, bodyColor: disabled ? "subtle" : bodyColor, grow: true, shrink: false }));
    return (_jsxs(_Fragment, { children: [_jsxs(Row, { ...otherProps, ref: ref, relative: true, tag: "li", role: "row", jsStyle: [
                    !bare && {
                        [":first-child *"]: {
                            borderTopLeftRadius: cssVar("--border-radius-l"),
                            borderTopRightRadius: cssVar("--border-radius-l"),
                        },
                        [":last-child *"]: {
                            borderBottomLeftRadius: cssVar("--border-radius-l"),
                            borderBottomRightRadius: cssVar("--border-radius-l"),
                        },
                    },
                    jsStyle,
                ], children: [_jsx(Row, { grow: true, role: "gridcell", jsStyle: {
                            overflow: "hidden",
                        }, children: children({ content }) }), outerAddOn && _jsx(BaseView, { role: "gridcell", children: outerAddOn })] }), withDivider && _jsx(ListDivider, {})] }));
});
//# sourceMappingURL=BaseListItem.js.map