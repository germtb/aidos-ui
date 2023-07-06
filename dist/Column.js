import React from "react";
import { FlexLayout } from "./FlexLayout";
export const Column = React.forwardRef((props, ref) => {
    return React.createElement(FlexLayout, { ref: ref, direction: "column", ...props });
});
//# sourceMappingURL=Column.js.map