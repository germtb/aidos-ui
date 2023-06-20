import React from "react";
import { createJSStyles } from "./Palette";
import { Box } from "./Box";
const jsStyles = createJSStyles({
    root: {
        borderRadius: "50%",
        overflow: "hidden",
    },
});
export function Circle({ jsStyle, padding = "medium", ...otherProps }) {
    return (<Box padding={padding} jsStyle={[jsStyles.root, jsStyle]} {...otherProps}/>);
}
//# sourceMappingURL=Circle.jsx.map