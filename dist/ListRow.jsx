import React from "react";
import { BaseListRow } from "./BaseListRow";
export const ListRow = React.forwardRef(({ componentName, ...otherProps }, ref) => {
    return (<BaseListRow {...otherProps} componentName={(componentName ?? []).concat("ListRow")} ref={ref} align="center"/>);
});
//# sourceMappingURL=ListRow.jsx.map