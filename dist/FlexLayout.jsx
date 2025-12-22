import React from "react";
import { BaseView } from "./BaseView";
import { getPadding, getSpacing, } from "./jss";
export const FlexLayout = React.forwardRef(({ jss, gap = "none", justify = "none", align = "none", padding = "none", direction = "column", ...otherProps }, ref) => {
    return (<BaseView ref={ref} jss={[
            {
                display: "flex",
                flexDirection: direction,
                gap: getSpacing(gap),
                justifyContent: justify,
                alignItems: align,
            },
            getPadding(padding),
            jss,
        ]} {...otherProps}/>);
});
//# sourceMappingURL=FlexLayout.jsx.map