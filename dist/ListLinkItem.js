import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BaseListItem } from "./BaseListItem";
import { getGlyphColor, getInteractableListItemJSStyles, } from "./Interactable";
import { BaseLink } from "./BaseLink";
export const ListLinkItem = React.forwardRef(({ onClick, href, disabled = false, padding = "medium", jsStyle, gap, selected, bare, color = "secondary", ...otherProps }, ref) => {
    return (_jsx(BaseListItem, { withDivider: !bare, disabled: disabled, padding: "none", gap: gap, headlineColor: getGlyphColor(color, disabled, true), bodyColor: getGlyphColor(color, disabled, true), selected: selected, bare: bare, ...otherProps, jsStyle: jsStyle, children: ({ content }) => (_jsx(BaseLink, { padding: padding, "aria-selected": selected, disabled: disabled, animateInteraction: false, bare: true, color: color, href: href, ref: ref, jsStyle: getInteractableListItemJSStyles({ bare }), onClick: onClick, children: content })) }));
});
//# sourceMappingURL=ListLinkItem.js.map