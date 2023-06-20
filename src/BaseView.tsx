import React from "react";
import { createClassNames, createJSStyles, JSStyles } from "./Palette";

const jsStyles = createJSStyles({
  relative: {
    position: "relative",
  },
  grow: {
    flexGrow: 1,
  },
  shrink: {
    flexShrink: 1,
  },
});

export interface BaseViewProps extends React.HTMLAttributes<HTMLElement> {
  jsStyle?: JSStyles;
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
      jsStyle,
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
        className={createClassNames(
          jsStyle,
          grow && jsStyles.grow,
          shrink && jsStyles.shrink,
          relative && jsStyles.relative
        )}
        {...otherProps}
      >
        {children}
      </Tag>
    );
  }
);
