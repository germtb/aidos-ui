import React, { useId } from "react";
import { createClassNames } from "./Palette";
export const BaseInput = React.forwardRef(({ jsStyle, labelContent, ...otherProps }, ref) => {
    const id = useId();
    return (React.createElement(React.Fragment, null,
        labelContent && React.createElement("label", { htmlFor: id }, labelContent),
        React.createElement("input", { id: id, ref: ref, className: createClassNames(jsStyle), ...otherProps })));
});
//# sourceMappingURL=BaseInput.js.map