import React from "react";
import { getAlign, getFlex, getPadding, getJustify, getGap, } from "./Palette";
import { BaseView } from "./BaseView";
export const FlexLayout = React.forwardRef(({ jsStyle, gap = "none", justify = "none", align = "none", padding = "none", direction = "column", componentName = [], ...otherProps }, ref) => {
    return (<BaseView ref={ref} componentName={componentName.concat("FlexLayout")} jsStyle={[
            getFlex(direction),
            getPadding(padding),
            getGap(gap),
            getJustify(justify),
            getAlign(align),
            jsStyle,
        ]} {...otherProps}/>);
});
//# sourceMappingURL=FlexLayout.jsx.map