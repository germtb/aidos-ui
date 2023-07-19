import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { FlexLayout } from "./FlexLayout";
export const Column = React.forwardRef((props, ref) => {
    return _jsx(FlexLayout, { ref: ref, direction: "column", ...props });
});
//# sourceMappingURL=Column.js.map