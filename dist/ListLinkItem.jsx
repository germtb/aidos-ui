import React from "react";
import { BaseListItem } from "./BaseListItem";
import { getGlyphColor, getInteractableListItemJSStyles, } from "./Interactable";
import { BaseLink } from "./BaseLink";
import { useListContext } from "./List";
export const ListLinkItem = React.forwardRef(({ onClick, href, disabled = false, padding = "medium", jss, gap, selected, color = "primary", target, ...otherProps }, ref) => {
    const { bare } = useListContext();
    return (<BaseListItem withDivider={!bare} disabled={disabled} aria-selected={selected} padding="none" gap={gap} headlineColor={getGlyphColor(color, disabled, true)} bodyColor={getGlyphColor(color, disabled, true)} selected={selected} {...otherProps} jss={jss}>
        {({ content }) => (<BaseLink target={target} padding={padding} aria-current={selected ? "page" : undefined} disabled={disabled} animateInteraction={false} bare={true} color={color} href={href} ref={ref} jss={getInteractableListItemJSStyles({ bare, selected })} onClick={onClick}>
            {content}
          </BaseLink>)}
      </BaseListItem>);
});
//# sourceMappingURL=ListLinkItem.jsx.map