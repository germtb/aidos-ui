import React from "react";
import { BaseView } from "./BaseView";
export const ListCell = React.forwardRef((props, ref) => {
    return React.createElement(BaseView, { ...props, role: "gridcell", ref: ref });
});
//# sourceMappingURL=ListCell.js.map