import React from "react";
import { Column } from "./Column";
export const BaseList = React.forwardRef(({ jsStyle, ...otherProps }, ref) => {
    return (<Column {...otherProps} tag="ul" jsStyle={[
            {
                listStyle: "none",
                margin: 0,
                padding: 0,
            },
            jsStyle,
        ]} ref={ref}/>);
});
//# sourceMappingURL=BaseList.jsx.map