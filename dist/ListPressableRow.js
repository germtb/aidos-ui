import React from "react";
import { createJSStyles } from "./Palette";
import { BaseButton } from "./BaseButton";
import { TextPairing } from "./TextPairing";
import { BaseView } from "./BaseView";
import { BaseListRow } from "./BaseListRow";
import { ListCell } from "./ListCell";
const jsStyles = createJSStyles({
    root: {
        position: "relative",
    },
    gridcell: {
        display: "flex",
        flexGrow: 1,
    },
    button: {
        paddingTop: "var(--spacing-s)",
        paddingBottom: "var(--spacing-s)",
        paddingRight: "var(--spacing-m)",
        flexGrow: 1,
        ":hover:active": {
            backgroundColor: "var(--pressed-background)",
        },
        ":active": {
            backgroundColor: "var(--pressed-background)",
        },
        ":active:disabled": {
            backgroundColor: "inherit",
        },
        ":hover:active:disabled": {
            backgroundColor: "inherit",
        },
    },
    primaryAddOn: {
        flexGrow: 0,
        flexShrink: 0,
    },
    textPairing: {
        flexBasis: "0%",
        flexGrow: 1,
        flexShrink: 0,
    },
    secondaryAddOn: {
        display: "flex",
        flexGrow: 0,
        flexShrink: 0,
    },
    interactiveAddOn: {
        flexGrow: 0,
        flexShrink: 0,
    },
    indented: {
        paddingLeft: "var(--spacing-m)",
    },
});
export const ListPressableRow = React.forwardRef(({ onPress, headline, headlineSize = "medium", headlineColor = "primary", headlineAddOn, body, bodySize = "small", bodyColor = "secondary", primaryAddOn, secondaryAddOn, color = "secondary", disabled = false, jsStyle, ...otherProps }, ref) => {
    return (React.createElement(BaseListRow, { ...otherProps, componentName: (otherProps.componentName ?? []).concat("ListPressableRow"), jsStyle: [jsStyles.root, jsStyle] },
        React.createElement(ListCell, { jsStyle: jsStyles.gridcell },
            React.createElement(BaseButton, { disabled: disabled, bare: true, color: color, ref: ref, jsStyle: [jsStyles.button, primaryAddOn ? null : jsStyles.indented], "aria-label": headline, onPress: onPress },
                primaryAddOn && (React.createElement(BaseView, { jsStyle: jsStyles.primaryAddOn }, primaryAddOn)),
                React.createElement(BaseView, { jsStyle: jsStyles.textPairing },
                    React.createElement(TextPairing, { headline: headline, headlineSize: headlineSize, headlineColor: disabled ? "subtle" : headlineColor, headlineAddOn: headlineAddOn, body: body, bodySize: bodySize, bodyColor: disabled ? "subtle" : bodyColor })),
                secondaryAddOn && (React.createElement(BaseView, { jsStyle: jsStyles.secondaryAddOn }, secondaryAddOn))))));
});
//# sourceMappingURL=ListPressableRow.js.map