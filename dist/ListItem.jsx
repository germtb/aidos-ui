import React from "react";
import { BaseListItem } from "./BaseListItem";
import { useListContext } from "./List";
export const ListItem = React.forwardRef((props, ref) => {
    const { bare } = useListContext();
    return (<BaseListItem withDivider={!bare} {...props} jsStyle={props.jsStyle} ref={ref}>
        {({ content }) => content}
      </BaseListItem>);
});
//# sourceMappingURL=ListItem.jsx.map