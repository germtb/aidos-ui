import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { FlexLayout } from "./FlexLayout";
export const Row = React.forwardRef((props, ref) => {
    return _jsx(FlexLayout, { ref: ref, direction: "row", ...props });
});
//# sourceMappingURL=Row.js.map