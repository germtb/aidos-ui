import React from "react";
import { BaseList, BaseListProps } from "./BaseList";
import { useNavigation } from "./useNavigation";

const PAGE_SIZE = 5;

interface ListProps extends BaseListProps {
  ariaLabel: string;
  autofocus?: boolean;
  role?: undefined;
}

export function List({
  ariaLabel,
  jsStyle,
  autofocus = false,
  ...otherProps
}: ListProps) {
  const rootRef = useNavigation();

  return (
    <BaseList
      role="grid"
      aria-label={ariaLabel}
      ref={rootRef}
      jsStyle={jsStyle}
      {...otherProps}
    />
  );
}
