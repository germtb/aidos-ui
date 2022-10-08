import React from "react";
import { BaseView, BaseViewProps } from "./BaseView";
import { createJSStyles } from "./Palette";

const jsStyles = createJSStyles({
  root: {
    backgroundColor: "var(--primary-background)",
    display: "flex",
    flexDirection: "column",
  },
});

export interface BaseListProps extends BaseViewProps {
  tag?: undefined;
}

export const BaseList = React.forwardRef(
  (
    { jsStyle, componentName, ...otherProps }: BaseListProps,
    ref?: React.Ref<HTMLElement>
  ) => {
    return (
      <BaseView
        {...otherProps}
        tag="ul"
        jsStyle={[jsStyles.root, jsStyle]}
        data-test-id={componentName ?? "BaseList"}
        ref={ref}
      />
    );
  }
);
