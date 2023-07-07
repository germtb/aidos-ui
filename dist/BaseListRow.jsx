import React from "react";
import { ListDivider } from "./ListDivider";
import { Row } from "./Row";
import { getBackground } from "./JSS";
export const BaseListRow = React.forwardRef(({ children, jsStyle, withDivider = true, backgroundColor = "primary-background", ...otherProps }, ref) => {
    return (<>
        <Row {...otherProps} ref={ref} tag="li" role="row" jsStyle={[
            {
                position: "relative",
            },
            getBackground(backgroundColor),
            jsStyle,
        ]}>
          {children}
        </Row>
        {withDivider && <ListDivider />}
      </>);
});
//# sourceMappingURL=BaseListRow.jsx.map