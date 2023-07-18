import React from "react";
import { BaseList, BaseListProps } from "./BaseList";
import { useNavigation } from "./useNavigation";
import { cssVar } from "./jss";

interface ListProps extends BaseListProps {
  ariaLabel: string;
  bare?: boolean;
  autofocus?: boolean;
  role?: undefined;
  navigation?: boolean;
}

export function List({
  ariaLabel,
  jsStyle,
  autofocus = false,
  navigation = true,
  bare,
  ...otherProps
}: ListProps) {
  const rootRef = useNavigation({ autofocus, enabled: navigation });

  return (
    <BaseList
      role="grid"
      aria-label={ariaLabel}
      ref={rootRef}
      jsStyle={[
        { overflow: "hidden" },
        !bare && {
          border: `1px solid ${cssVar("--divider")}`,
          borderRadius: cssVar("--border-radius-l"),
          background: cssVar("--overlay-background"),
        },
        jsStyle,
      ]}
      {...otherProps}
    />
  );
}
