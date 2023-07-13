import React from "react";
import { BaseView } from "./BaseView";
import { getPadding, getSpacing, } from "./jss";
export const FlexLayout = React.forwardRef(({ jsStyle, gap = "none", justify = "none", align = "none", padding = "none", direction = "column", ...otherProps }, ref) => {
    return (React.createElement(BaseView, { ref: ref, jsStyle: [
            {
                display: "flex",
                flexDirection: direction,
                gap: getSpacing(gap),
                justifyContent: justify,
                alignItems: align,
            },
            getPadding(padding),
            jsStyle,
        ], ...otherProps }));
});
//# sourceMappingURL=FlexLayout.js.map