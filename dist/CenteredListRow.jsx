import React from "react";
import { BaseListRow } from "./BaseListRow";
import { grow } from "./JSS";
export const CenteredListRow = React.forwardRef((props, ref) => {
    return (<BaseListRow {...props} align="center" justify="center" jsStyle={[
            props.jsStyle,
            {
                position: "relative",
                padding: "var(--spacing-m)",
            },
            grow,
        ]} ref={ref} withDivider={false}/>);
});
//# sourceMappingURL=CenteredListRow.jsx.map