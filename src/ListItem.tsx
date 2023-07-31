import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";
import { cssVar } from "./jss";
import { useListContext } from "./List";

// @ts-ignore
interface ListItemProps extends BaseListItemProps {
  headline: string;
  body?: string;
  children?: void;
}

export const ListItem = React.forwardRef(
  (props: ListItemProps, ref?: React.Ref<HTMLLIElement>) => {
    const { bare } = useListContext();

    return (
      <BaseListItem
        withDivider={!bare}
        {...props}
        jsStyle={props.jsStyle}
        ref={ref}
      >
        {({ content }) => content}
      </BaseListItem>
    );
  }
);
