import React from "react";
import { Box } from "./Box";
export function Circle({ jss, padding = "medium", ...otherProps }) {
    return (<Box padding={padding} jss={[
            {
                borderRadius: "50%",
                overflow: "hidden",
            },
            jss,
        ]} {...otherProps}/>);
}
//# sourceMappingURL=Circle.jsx.map