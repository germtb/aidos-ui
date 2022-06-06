import React from "react";
import { BaseListRow, BaseListRowProps } from "./BaseListRow";

interface ListRow extends BaseListRowProps {}

export const ListRow = React.forwardRef(
  (
    { componentName, ...otherProps }: ListRow,
    ref?: React.Ref<HTMLLIElement>
  ) => {
    return (
      <BaseListRow
        {...otherProps}
        componentName={(componentName ?? []).concat("ListRow")}
        ref={ref}
        align="center"
      />
    );
  }
);
