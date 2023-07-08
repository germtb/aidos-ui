import React from "react";
import { BaseListRow, BaseListRowProps } from "./BaseListRow";
import { cssVar, grow } from "./jss";

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
          },
          grow,
        ]}
        ref={ref}
        withDivider={false}
      />
    );
  }
);
