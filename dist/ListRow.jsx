import React from "react";
import { BaseListRow } from "./BaseListRow";
export const ListRow = React.forwardRef((props, ref) => {
    return <BaseListRow {...props} ref={ref} align="center"/>;
});
//# sourceMappingURL=ListRow.jsx.map