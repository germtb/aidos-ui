import React from "react";
import { FlexLayout } from "./FlexLayout";
export const Row = React.forwardRef(({ componentName = [], ...otherProps }, ref) => {
    return (<FlexLayout ref={ref} componentName={componentName.concat("Row")} direction="row" {...otherProps}/>);
});
//# sourceMappingURL=Row.jsx.map