import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BaseListItem } from "./BaseListItem";
import { useListContext } from "./List";
export const ListItem = React.forwardRef((props, ref) => {
    const { bare } = useListContext();
    return (_jsx(BaseListItem, { withDivider: !bare, ...props, jsStyle: props.jsStyle, ref: ref, children: ({ content }) => content }));
});
//# sourceMappingURL=ListItem.js.map