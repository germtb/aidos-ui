import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BaseListItem } from "./BaseListItem";
import { getGlyphColor, getInteractableListItemJSS, } from "./Interactable";
import { BaseButton } from "./BaseButton";
import { useListContext } from "./List";
export const ListButtonItem = React.forwardRef(({ onClick, color = "primary", disabled = false, padding = "medium", jss, gap, selected, ...otherProps }, ref) => {
    const { bare } = useListContext();
    return (_jsx(BaseListItem, { withDivider: !bare, disabled: disabled, padding: "none", gap: gap, headlineColor: getGlyphColor(color, disabled, true), bodyColor: getGlyphColor(color, disabled, true), selected: selected, "aria-selected": selected, ...otherProps, jss: jss, children: ({ content }) => (_jsx(BaseButton, { padding: padding, disabled: disabled, animateInteraction: false, bare: true, color: bare ? "primary" : color, ref: ref, jss: getInteractableListItemJSS({ bare, selected }), onClick: onClick, children: content })) }));
});
//# sourceMappingURL=ListButtonItem.js.map