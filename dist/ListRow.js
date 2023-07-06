import React from "react";
import { BaseListRow } from "./BaseListRow";
export const ListRow = React.forwardRef((props, ref) => {
    return React.createElement(BaseListRow, { ...props, ref: ref, align: "center" });
});
//# sourceMappingURL=ListRow.js.map