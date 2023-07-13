import React from "react";
import { BaseButton } from "./BaseButton";
import { TextPairing } from "./TextPairing";
import { BaseListRow } from "./BaseListRow";
import { ListCell } from "./ListCell";
import { cssVar, } from "./jss";
import { BaseLink } from "./BaseLink";
export const ListPressableRow = React.forwardRef(({ onClick, href, headline, headlineSize = "medium", headlineColor = "primary", headlineAddOn, body, bodySize = "small", bodyColor = "secondary", addOn, addOnPosition, outerAddOn, color = "secondary", disabled = false, padding = "medium", jsStyle, gap, selected, bare, ...otherProps }, ref) => {
    const textPairing = (React.createElement(TextPairing, { gap: gap, addOn: addOn, addOnPosition: addOnPosition, headline: headline, headlineSize: headlineSize, headlineColor: disabled ? "subtle" : bare && selected ? "highlight" : headlineColor, headlineAddOn: headlineAddOn, body: body, bodySize: bodySize, bodyColor: disabled ? "subtle" : bodyColor, grow: true, shrink: false }));
    const pressabelJSStyle = {
        overflow: "hidden",
        flexGrow: 1,
        borderRadius: bare ? cssVar("--border-radius-m") : null,
        marginLeft: bare ? cssVar("--spacing-m") : null,
        marginRight: bare ? cssVar("--spacing-m") : null,
        textDecoration: "none",
        "[aria-selected=true]": {
            backgroundColor: bare
                ? cssVar("--light-highlight")
                : cssVar("--selected-background"),
            boxShadow: bare ? "" : "inset 1px 1px 2px -1px #0000004a",
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
    };
    return (React.createElement(BaseListRow, { relative: true, withDivider: !bare, ...otherProps, jsStyle: jsStyle },
        React.createElement(ListCell, { jsStyle: {
                display: "flex",
                flexGrow: 1,
                overflow: "hidden",
            } }, href != null ? (React.createElement(BaseLink, { "aria-selected": selected, disabled: disabled, animateInteraction: false, bare: true, color: color, href: href, 
            // @ts-ignore
            ref: ref, jsStyle: pressabelJSStyle, "aria-label": headline, onClick: onClick, padding: padding }, textPairing)) : (React.createElement(BaseButton, { "aria-selected": selected, disabled: disabled, animateInteraction: false, bare: true, color: color, 
            // @ts-ignore
            ref: ref, jsStyle: pressabelJSStyle, "aria-label": headline, onClick: onClick, padding: padding }, textPairing))),
        outerAddOn && React.createElement(ListCell, null, outerAddOn)));
});
//# sourceMappingURL=ListPressableRow.js.map