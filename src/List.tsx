import React from "react";
import { BaseList, BaseListProps } from "./BaseList";
import { useNavigation } from "./useNavigation";

export interface ListProps extends BaseListProps {
  ariaLabel: string;
  autofocus?: boolean;
  role?: undefined;
  navigation?: boolean;
}

export function List({
  ariaLabel,
  jss,
  gap = "small",
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
      jss={[{ overflow: "hidden" }, jss]}
      gap={gap}
      {...otherProps}
    />
  );
}
