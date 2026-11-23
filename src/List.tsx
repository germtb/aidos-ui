import React, { useCallback } from "react";
import { BaseList, BaseListProps } from "./BaseList";
import { useNavigation } from "./useNavigation";
import { useRefEffect } from "./useRefEffect";
import { getMaterial } from "./jss";

export interface ListProps extends BaseListProps {
  ariaLabel: string;
  autofocus?: boolean;
  role?: undefined;
  navigation?: boolean;
}

export const List = React.forwardRef(function List(
  {
    ariaLabel,
    jss,
    material,
    gap = "small",
    autofocus = false,
    navigation = true,
    ...otherProps
  }: ListProps,
  ref?: React.Ref<HTMLElement>,
) {
  const navigationRef = useNavigation({ autofocus, enabled: navigation });
  const rootRef = useRefEffect(
    useCallback(
      (element: HTMLElement) => {
        navigationRef(element);
        const cleanup = typeof ref === "function" ? ref(element) : undefined;
        if (ref && typeof ref !== "function") ref.current = element;
        return () => {
          navigationRef(null);
          if (typeof cleanup === "function") cleanup();
          else if (typeof ref === "function") ref(null);
          else if (ref) ref.current = null;
        };
      },
      [navigationRef, ref],
    ),
  );

  return (
    <BaseList
      role="grid"
      aria-label={ariaLabel}
      ref={rootRef}
      jss={[{ overflow: "hidden" }, material && getMaterial(material), jss]}
      gap={gap}
      {...otherProps}
    />
  );
});
