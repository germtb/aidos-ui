import React from "react";
import { ListDivider } from "./ListDivider";
import { Row } from "./Row";
import { getBackground } from "./jss";
export const BaseListRow = React.forwardRef(({ children, jsStyle, withDivider = true, backgroundColor = "primary-background", ...otherProps }, ref) => {
    return (<>
        <Row {...otherProps} ref={ref} relative={true} tag="li" role="row" jsStyle={[getBackground(backgroundColor), jsStyle]}>
          {children}
        </Row>
        {withDivider && <ListDivider />}
      </>);
});
//# sourceMappingURL=BaseListRow.jsx.map