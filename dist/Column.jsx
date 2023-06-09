import React from "react";
import { FlexLayout } from "./FlexLayout";
export const Column = React.forwardRef(({ componentName = [], ...otherProps }, ref) => {
    return (<FlexLayout ref={ref} componentName={componentName.concat("Column")} direction="column" {...otherProps}/>);
});
//# sourceMappingURL=Column.jsx.map