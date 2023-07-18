import React from "react";
import { BaseListItem } from "./BaseListItem";
export const ListItem = React.forwardRef((props, ref) => {
    return (<BaseListItem withDivider={!props.bare} {...props} jsStyle={props.jsStyle} ref={ref}>
        {({ content }) => content}
      </BaseListItem>);
});
//# sourceMappingURL=ListItem.jsx.map