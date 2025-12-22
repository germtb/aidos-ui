import React, { useId } from "react";
import { toClassnames } from "./jss";
import { Label } from "./Text";
export const BaseInput = React.forwardRef(({ jss, label, labelPosition = "end", labelSize, labelColor, labelBold, id: propId, ...otherProps }, ref) => {
    const hookid = useId();
    const id = propId ?? hookid;
    const labelElement = (<Label size={labelSize} bold={labelBold} color={labelColor} jss={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }} htmlFor={id}>
        {label}
      </Label>);
    return (<>
        {label && labelPosition === "start" && labelElement}
        <input id={id} ref={ref} className={toClassnames(jss)} {...otherProps}/>
        {label && labelPosition === "end" && labelElement}
      </>);
});
//# sourceMappingURL=BaseInput.jsx.map