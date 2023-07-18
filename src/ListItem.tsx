import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";
import { cssVar } from "./jss";

// @ts-ignore
interface ListItemProps extends BaseListItemProps {
  headline: string;
  body?: string;
  bare?: boolean;
  children?: void;
}

export const ListItem = React.forwardRef(
  (props: ListItemProps, ref?: React.Ref<HTMLLIElement>) => {
    return (
      <BaseListItem
        withDivider={!props.bare}
        {...props}
        jsStyle={props.jsStyle}
        ref={ref}
      >
        {({ content }) => content}
      </BaseListItem>
    );
  }
);
