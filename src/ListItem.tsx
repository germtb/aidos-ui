import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";

export interface ListItemProps extends Omit<BaseListItemProps, "children"> {
  headline: string;
  body?: string;
  children?: void;
}

export const ListItem = React.forwardRef(function ListItem(
  props: ListItemProps,
  ref?: React.Ref<HTMLLIElement>,
) {
  return (
    <BaseListItem {...props} ref={ref}>
      {({ content }) => content}
    </BaseListItem>
  );
});
