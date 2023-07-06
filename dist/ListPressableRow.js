import React from "react";
import { createJSStyle, } from "./Styles";
import { BaseButton } from "./BaseButton";
import { TextPairing } from "./TextPairing";
import { BaseListRow } from "./BaseListRow";
import { ListCell } from "./ListCell";
const jsStyles = createJSStyle({
    root: {
        position: "relative",
    },
    gridcell: {
        display: "flex",
        flexGrow: 1,
        overflow: "hidden",
    },
    button: {
        overflow: "hidden",
        flexGrow: 1,
        backgroundColor: "var(--primary-background)",
        "[aria-selected=true]": {
            backgroundColor: "var(--selected-background)",
        },
        ":hover": {
            backgroundColor: "var(--hovered-background)",
        },
        "[aria-selected=true]:hover": {
            backgroundColor: "var(--hovered-background)",
        },
        ":active:hover": {
            backgroundColor: "var(--pressed-background)",
        },
        "[aria-selected=true]:active:hover": {
            backgroundColor: "var(--pressed-background)",
        },
        "[aria-disabled=true]": {
            backgroundColor: "var(--primary-background)",
        },
        "[aria-disabled=true]:active:hover": {
            backgroundColor: "var(--primary-background)",
        },
    },
    addOn: {
        flexGrow: 0,
        flexShrink: 0,
    },
    outerAddOn: {
        display: "flex",
        flexGrow: 0,
        flexShrink: 0,
    },
    interactiveAddOn: {
        flexGrow: 0,
        flexShrink: 0,
    },
});
export const ListPressableRow = React.forwardRef(({ onPress, headline, headlineSize = "medium", headlineColor = "primary", headlineAddOn, body, bodySize = "small", bodyColor = "secondary", addOn, addOnPosition, outerAddOn, color = "secondary", disabled = false, padding = "medium", jsStyle, gap, selected, ...otherProps }, ref) => {
    return (React.createElement(BaseListRow, { ...otherProps, jsStyle: [jsStyles.root, jsStyle] },
        React.createElement(ListCell, { jsStyle: jsStyles.gridcell },
            React.createElement(BaseButton, { "aria-selected": selected, disabled: disabled, animateInteraction: false, bare: true, color: color, ref: ref, jsStyle: jsStyles.button, "aria-label": headline, onPress: onPress, padding: padding },
                React.createElement(TextPairing, { gap: gap, addOn: addOn, addOnPosition: addOnPosition, headline: headline, headlineSize: headlineSize, headlineColor: disabled ? "subtle" : headlineColor, headlineAddOn: headlineAddOn, body: body, bodySize: bodySize, bodyColor: disabled ? "subtle" : bodyColor, grow: true, shrink: false }))),
        outerAddOn && React.createElement(ListCell, null, outerAddOn)));
});
//# sourceMappingURL=ListPressableRow.js.map