import React, { useId } from "react";
import { createClassNames } from "./Palette";
export const BaseInput = React.forwardRef(({ jsStyle, componentName, labelContent, ...otherProps }, ref) => {
    const id = useId();
    return (<>
        {labelContent && <label htmlFor={id}>{labelContent}</label>}
        <input id={id} data-test-id={componentName ?? "BaseInput"} ref={ref} className={createClassNames(jsStyle)} {...otherProps}/>
      </>);
});
//# sourceMappingURL=BaseInput.jsx.map