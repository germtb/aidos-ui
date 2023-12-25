import React from "react";
import { BaseListItem } from "./BaseListItem";
import { getGlyphColor, getInteractableListItemJSStyles, } from "./Interactable";
import { BaseButton } from "./BaseButton";
import { useListContext } from "./List";
export const ListButtonItem = React.forwardRef(({ onClick, color = "primary", disabled = false, padding = "medium", jsStyle, gap, selected, ...otherProps }, ref) => {
    const { bare } = useListContext();
    return (<BaseListItem withDivider={!bare} disabled={disabled} padding="none" gap={gap} headlineColor={getGlyphColor(color, disabled, true)} bodyColor={getGlyphColor(color, disabled, true)} selected={selected} aria-selected={selected} {...otherProps} jsStyle={jsStyle}>
        {({ content }) => (<BaseButton padding={padding} disabled={disabled} animateInteraction={false} bare={true} color={bare ? "primary" : color} ref={ref} jsStyle={getInteractableListItemJSStyles({ bare, selected })} onClick={onClick}>
            {content}
          </BaseButton>)}
      </BaseListItem>);
});
//# sourceMappingURL=ListButtonItem.jsx.map