import React from "react";
import { BaseList, BaseListProps } from "./BaseList";
import { useNavigation } from "./useNavigation";

interface ListProps extends BaseListProps {
  ariaLabel: string;
  autofocus?: boolean;
  role?: undefined;
  navigation?: boolean;
}

export function List({
  ariaLabel,
  jsStyle,
  autofocus = false,
  navigation = true,
  ...otherProps
}: ListProps) {
  const rootRef = useNavigation({ autofocus, enabled: navigation });

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
