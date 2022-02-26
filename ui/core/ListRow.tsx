import React from "react";
import BaseListRow, { BaseListRowProps } from "./BaseListRow";

interface ListRow extends BaseListRowProps {}

function ListRow(props: ListRow, ref?: React.Ref<HTMLLIElement>) {
  return <BaseListRow {...props} ref={ref} />;
}

export default React.forwardRef(ListRow);
