import React from "react";
import { FlexLayout } from "./FlexLayout";
export const Row = React.forwardRef((props, ref) => {
    return React.createElement(FlexLayout, { ref: ref, direction: "row", ...props });
});
//# sourceMappingURL=Row.js.map