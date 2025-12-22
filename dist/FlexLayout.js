import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BaseView } from "./BaseView";
import { getPadding, getSpacing, } from "./jss";
export const FlexLayout = React.forwardRef(({ jss, gap = "none", justify = "none", align = "none", padding = "none", direction = "column", ...otherProps }, ref) => {
    return (_jsx(BaseView, { ref: ref, jss: [
            {
                display: "flex",
                flexDirection: direction,
                gap: getSpacing(gap),
                justifyContent: justify,
                alignItems: align,
            },
            getPadding(padding),
            jss,
        ], ...otherProps }));
});
//# sourceMappingURL=FlexLayout.js.map