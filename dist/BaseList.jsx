import React from "react";
import { Column } from "./Column";
export const BaseList = React.forwardRef(({ jss, ...otherProps }, ref) => {
    return (<Column {...otherProps} tag="ul" jss={[
            {
                listStyle: "none",
                margin: 0,
                padding: 0,
            },
            jss,
        ]} ref={ref}/>);
});
//# sourceMappingURL=BaseList.jsx.map