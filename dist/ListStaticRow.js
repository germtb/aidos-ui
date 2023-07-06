import React from "react";
import { createJSStyle } from "./Styles";
import { TextPairing } from "./TextPairing";
import { BaseView } from "./BaseView";
import { BaseListRow } from "./BaseListRow";
import { Column } from "./Column";
const jsStyles = createJSStyle({
    root: {
        position: "relative",
        paddingTop: "var(--spacing-s)",
        paddingBottom: "var(--spacing-s)",
        paddingRight: "var(--spacing-m)",
        paddingLeft: "var(--spacing-m)",
    },
    backgroundPrimary: {
        backgroundColor: "var(--primary-background)",
    },
    backgroundSecondary: {
        backgroundColor: "var(--secondary-background)",
    },
    view: {
        display: "flex",
        flexGrow: 1,
    },
    primaryAddOn: {
        flexGrow: 0,
        flexShrink: 0,
    },
    textPairing: {
        flexBasis: "0%",
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: "center",
    },
    secondaryAddOn: {
        display: "flex",
        flexGrow: 0,
        flexShrink: 0,
        flexDirection: "column",
        justifyContent: "center",
    },
    interactiveAddOn: {
        flexGrow: 0,
        flexShrink: 0,
    },
});
export const ListStaticRow = React.forwardRef(({ headline, headlineSize = "medium", headlineColor = "primary", body, bodySize = "small", bodyColor = "secondary", primaryAddOn, secondaryAddOn, background = "primary", ...otherProps }, ref) => {
    return (React.createElement(BaseListRow, { ...otherProps, padding: primaryAddOn ? "none" : "medium", jsStyle: [
            jsStyles.root,
            background === "primary" && jsStyles.backgroundPrimary,
            background === "secondary" && jsStyles.backgroundSecondary,
        ], ref: ref },
        React.createElement(BaseView, { jsStyle: jsStyles.view },
            primaryAddOn && (React.createElement(BaseView, { jsStyle: jsStyles.primaryAddOn }, primaryAddOn)),
            React.createElement(Column, { jsStyle: jsStyles.textPairing },
                React.createElement(TextPairing, { headline: headline, headlineSize: headlineSize, headlineColor: headlineColor, body: body, bodySize: bodySize, bodyColor: bodyColor })),
            secondaryAddOn && (React.createElement(BaseView, { jsStyle: jsStyles.secondaryAddOn }, secondaryAddOn)))));
});
//# sourceMappingURL=ListStaticRow.js.map