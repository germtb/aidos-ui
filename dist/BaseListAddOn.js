import React from "react";
import { BaseView } from "./BaseView";
export const BaseListAddOn = React.forwardRef(({ componentName, ...otherProps }, ref) => {
    return (React.createElement(BaseView, { ...otherProps, ref: ref, componentName: (componentName ?? []).concat("BaseListAddOn") }));
});
//# sourceMappingURL=BaseListAddOn.js.map