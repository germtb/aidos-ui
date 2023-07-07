import React from "react";
import { Box } from "./Box";
const jsStyles = {
    root: {
        borderRadius: "50%",
        overflow: "hidden",
    },
};
export function Circle({ jsStyle, padding = "medium", ...otherProps }) {
    return (<Box padding={padding} jsStyle={[jsStyles.root, jsStyle]} {...otherProps}/>);
}
//# sourceMappingURL=Circle.jsx.map