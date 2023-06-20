import React from "react";
import { BaseView } from "./BaseView";
export const BaseListAddOn = React.forwardRef((props, ref) => {
    return React.createElement(BaseView, { ...props, ref: ref });
});
//# sourceMappingURL=BaseListAddOn.js.map