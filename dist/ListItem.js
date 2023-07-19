import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BaseListItem } from "./BaseListItem";
export const ListItem = React.forwardRef((props, ref) => {
    return (_jsx(BaseListItem, { withDivider: !props.bare, ...props, jsStyle: props.jsStyle, ref: ref, children: ({ content }) => content }));
});
//# sourceMappingURL=ListItem.js.map