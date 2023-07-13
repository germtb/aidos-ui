import React from "react";
import { BaseListRow } from "./BaseListRow";
import { cssVar } from "./jss";
export const CenteredListRow = React.forwardRef((props, ref) => {
    return (<BaseListRow {...props} align="center" justify="center" jsStyle={[
            props.jsStyle,
            {
                position: "relative",
                padding: cssVar("--spacing-m"),
                flexGrow: 1,
            },
        ]} ref={ref} withDivider={false}/>);
});
//# sourceMappingURL=CenteredListRow.jsx.map