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
  carded?: boolean;
}

export function List({
  ariaLabel,
  jsStyle,
  autofocus = false,
  navigation = true,
  bare,
  carded = true,
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
          backgroundColor: cssVar("--overlay-background"),
        },
        !bare &&
          !carded && {
            borderBottom: `1px solid ${cssVar("--divider")}`,
            borderTop: `1px solid ${cssVar("--divider")}`,
          },
        !bare &&
          carded && {
            border: `1px solid ${cssVar("--divider")}`,
            borderRadius: cssVar("--border-radius-l"),
          },
        jsStyle,
      ]}
      {...otherProps}
    />
  );
}
