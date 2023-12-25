import React, { useId } from "react";
import { jss } from "./jss";
import { Label } from "./Text";
export const BaseInput = React.forwardRef(({ jsStyle, label, labelPosition = "end", labelSize, labelColor, labelBold, id: propId, ...otherProps }, ref) => {
    const hookid = useId();
    const id = propId ?? hookid;
    const labelElement = (<Label size={labelSize} bold={labelBold} color={labelColor} jsStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }} htmlFor={id}>
        {label}
      </Label>);
    return (<>
        {label && labelPosition === "start" && labelElement}
        <input id={id} ref={ref} className={jss(jsStyle)} {...otherProps}/>
        {label && labelPosition === "end" && labelElement}
      </>);
});
//# sourceMappingURL=BaseInput.jsx.map