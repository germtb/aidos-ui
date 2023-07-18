import React from "react";
import { BaseListItem } from "./BaseListItem";
import { getGlyphColor, getInteractableListItemJSStyles, } from "./Interactable";
import { BaseButton } from "./BaseButton";
export const ListButtonItem = React.forwardRef(({ onClick, color = "secondary", disabled = false, padding = "medium", jsStyle, gap, selected, bare, ...otherProps }, ref) => {
    return (<BaseListItem withDivider={!bare} disabled={disabled} padding="none" gap={gap} headlineColor={getGlyphColor(color, disabled, true)} bodyColor={getGlyphColor(color, disabled, true)} selected={selected} bare={bare} {...otherProps} jsStyle={jsStyle}>
        {({ content }) => (<BaseButton padding={padding} aria-selected={selected} disabled={disabled} animateInteraction={false} bare={true} color={bare ? "secondary" : color} ref={ref} jsStyle={getInteractableListItemJSStyles({ bare })} onClick={onClick}>
            {content}
          </BaseButton>)}
      </BaseListItem>);
});
//# sourceMappingURL=ListButtonItem.jsx.map