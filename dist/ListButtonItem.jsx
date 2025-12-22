import React from "react";
import { BaseListItem } from "./BaseListItem";
import { getGlyphColor, getInteractableListItemJSStyles, } from "./Interactable";
import { BaseButton } from "./BaseButton";
import { useListContext } from "./List";
export const ListButtonItem = React.forwardRef(({ onClick, color = "primary", disabled = false, padding = "medium", jss, gap, selected, ...otherProps }, ref) => {
    const { bare } = useListContext();
    return (<BaseListItem withDivider={!bare} disabled={disabled} padding="none" gap={gap} headlineColor={getGlyphColor(color, disabled, true)} bodyColor={getGlyphColor(color, disabled, true)} selected={selected} aria-selected={selected} {...otherProps} jss={jss}>
        {({ content }) => (<BaseButton padding={padding} disabled={disabled} animateInteraction={false} bare={true} color={bare ? "primary" : color} ref={ref} jss={getInteractableListItemJSStyles({ bare, selected })} onClick={onClick}>
            {content}
          </BaseButton>)}
      </BaseListItem>);
});
//# sourceMappingURL=ListButtonItem.jsx.map