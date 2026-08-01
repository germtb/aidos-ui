import React from "react";
import { JSS, toClassnames } from "./jss";

const styles: { [key: string]: JSS } = {
  relative: {
    position: "relative",
  },
  grow: {
    flexGrow: 1,
  },
  shrink: {
    flexShrink: 1,
  },
};

export interface BaseViewProps extends React.HTMLAttributes<HTMLElement> {
  jss?: JSS;
  ref?: React.Ref<HTMLDivElement>;
  className?: undefined;
  grow?: boolean;
  shrink?: boolean;
  relative?: boolean;
  tag?: keyof HTMLElementTagNameMap;
}

export const BaseView = React.forwardRef(function BaseView(
  { jss, children, tag, grow, shrink, relative, ...otherProps }: BaseViewProps,
  ref?: React.Ref<HTMLElement>,
) {
  const Tag: React.ElementType = tag ?? "div";

  return React.createElement(
    Tag,
    {
      ...otherProps,
      ref,
      className: toClassnames([
        jss,
        grow && styles.grow,
        shrink && styles.shrink,
        relative && styles.relative,
      ]),
    },
    children,
  );
});
