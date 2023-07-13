import React, { useId } from "react";
import { jss } from "./jss";
export const BaseInput = React.forwardRef(({ jsStyle, labelContent, ...otherProps }, ref) => {
    const id = useId();
    return (<>
        {labelContent && <label htmlFor={id}>{labelContent}</label>}
        <input id={id} ref={ref} className={jss(jsStyle)} {...otherProps}/>
      </>);
});
//# sourceMappingURL=BaseInput.jsx.map