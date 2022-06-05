import React from "react";
import BaseView, { BaseViewProps } from "./BaseView";

interface ListCell extends BaseViewProps {
  role?: undefined;
}

function ListCell(props: ListCell, ref?: React.Ref<HTMLDivElement>) {
  return (
    <BaseView
      {...props}
      componentName={(props.componentName ?? []).concat("ListCell")}
      role="gridcell"
      ref={ref}
    />
  );
}

export default React.forwardRef(ListCell);
