import React from "react";
import { BaseListRow, BaseListRowProps } from "./BaseListRow";
import { cssVar } from "./jss";

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
            padding: cssVar("--spacing-m"),
            flexGrow: 1,
          },
        ]}
        ref={ref}
        withDivider={false}
      />
    );
  }
);
