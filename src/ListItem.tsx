import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";

export interface ListItemProps extends Omit<BaseListItemProps, "children"> {
  headline: string;
  body?: string;
  children?: void;
}

export const ListItem = React.forwardRef(function ListItem(
  {
    bodyEllipsis = false,
    bodySize = "medium",
    padding = "none",
    ...props
  }: ListItemProps,
  ref?: React.Ref<HTMLLIElement>,
) {
  return (
    <BaseListItem
      {...props}
      bodyEllipsis={bodyEllipsis}
      bodySize={bodySize}
      padding={padding}
      jss={props.jss}
      ref={ref}
    >
      {({ content }) => content}
    </BaseListItem>
  );
});
