import React from "react";
import BaseListRow, { BaseListRowProps } from "./BaseListRow";

interface ListRow extends BaseListRowProps {}

function ListRow(
  { componentName, ...otherProps }: ListRow,
  ref?: React.Ref<HTMLLIElement>
) {
  return (
    <BaseListRow
      {...otherProps}
      componentName={(componentName ?? []).concat("ListRow")}
      ref={ref}
      align="center"
    />
  );
}

export default React.forwardRef(ListRow);
