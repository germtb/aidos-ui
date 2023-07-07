import React from "react";
import { BaseListRow, BaseListRowProps } from "./BaseListRow";
import { grow } from "./JSS";

interface CenteredListRow extends BaseListRowProps {
  withDivider?: false;
}

export const CenteredListRow = React.forwardRef(
  (props: CenteredListRow, ref?: React.Ref<HTMLLIElement>) => {
    return (
      <BaseListRow
        {...props}
        align="center"
        justify="center"
        jsStyle={[
          props.jsStyle,
          {
            position: "relative",
            padding: "var(--spacing-m)",
          },
          grow,
        ]}
        ref={ref}
        withDivider={false}
      />
    );
  }
);
