import React from "react";
import { BaseView, BaseViewProps } from "./BaseView";
import { createJSStyle } from "./Styles";

const jsStyles = createJSStyle({
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
  ({ jsStyle, ...otherProps }: BaseListProps, ref?: React.Ref<HTMLElement>) => {
    return (
      <BaseView
        {...otherProps}
        tag="ul"
        jsStyle={[jsStyles.root, jsStyle]}
        ref={ref}
      />
    );
  }
);
