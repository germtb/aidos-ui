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

export const BaseView = React.forwardRef(
  (
    {
      jss,
      children,
      tag,
      grow,
      shrink,
      relative,
      ...otherProps
    }: BaseViewProps,
    ref?: React.Ref<HTMLElement>
  ) => {
    const Tag: string = tag ?? "div";

    return (
      // @ts-ignore
      <Tag
        ref={ref}
        className={toClassnames([
          jss,
          grow && styles.grow,
          shrink && styles.shrink,
          relative && styles.relative,
        ])}
        {...otherProps}
      >
        {children}
      </Tag>
    );
  }
);
