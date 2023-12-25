import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BaseListItem } from "./BaseListItem";
import { getGlyphColor, getInteractableListItemJSStyles, } from "./Interactable";
import { BaseLink } from "./BaseLink";
import { useListContext } from "./List";
export const ListLinkItem = React.forwardRef(({ onClick, href, disabled = false, padding = "medium", jsStyle, gap, selected, color = "primary", target, ...otherProps }, ref) => {
    const { bare } = useListContext();
    return (_jsx(BaseListItem, { withDivider: !bare, disabled: disabled, "aria-selected": selected, padding: "none", gap: gap, headlineColor: getGlyphColor(color, disabled, true), bodyColor: getGlyphColor(color, disabled, true), selected: selected, ...otherProps, jsStyle: jsStyle, children: ({ content }) => (_jsx(BaseLink, { target: target, padding: padding, "aria-current": selected ? "page" : undefined, disabled: disabled, animateInteraction: false, bare: true, color: color, href: href, ref: ref, jsStyle: getInteractableListItemJSStyles({ bare, selected }), onClick: onClick, children: content })) }));
});
//# sourceMappingURL=ListLinkItem.js.map