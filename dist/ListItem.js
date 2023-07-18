import React from "react";
import { BaseListItem } from "./BaseListItem";
export const ListItem = React.forwardRef((props, ref) => {
    return (React.createElement(BaseListItem, { withDivider: !props.bare, ...props, jsStyle: props.jsStyle, ref: ref }, ({ content }) => content));
});
//# sourceMappingURL=ListItem.js.map