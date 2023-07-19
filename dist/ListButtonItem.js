import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BaseListItem } from "./BaseListItem";
import { getGlyphColor, getInteractableListItemJSStyles, } from "./Interactable";
import { BaseButton } from "./BaseButton";
export const ListButtonItem = React.forwardRef(({ onClick, color = "secondary", disabled = false, padding = "medium", jsStyle, gap, selected, bare, ...otherProps }, ref) => {
    return (_jsx(BaseListItem, { withDivider: !bare, disabled: disabled, padding: "none", gap: gap, headlineColor: getGlyphColor(color, disabled, true), bodyColor: getGlyphColor(color, disabled, true), selected: selected, "aria-selected": selected, bare: bare, ...otherProps, jsStyle: jsStyle, children: ({ content }) => (_jsx(BaseButton, { padding: padding, disabled: disabled, animateInteraction: false, bare: true, color: bare ? "secondary" : color, ref: ref, jsStyle: getInteractableListItemJSStyles({ bare }), onClick: onClick, children: content })) }));
});
//# sourceMappingURL=ListButtonItem.js.map