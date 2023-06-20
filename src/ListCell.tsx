import React from "react";
import { BaseView, BaseViewProps } from "./BaseView";

interface ListCell extends BaseViewProps {
  role?: undefined;
}

export const ListCell = React.forwardRef(
  (props: ListCell, ref?: React.Ref<HTMLDivElement>) => {
    return <BaseView {...props} role="gridcell" ref={ref} />;
  }
);
