import React from "react";
import { createClassNames, createJSStyles, JSStyles } from "./Palette";

const jsStyles = createJSStyles({
  grow: {
    flexGrow: 1,
  },
  shrink: {
    flexShrink: 1,
  },
});

export type ComponentName = Array<string>;

export interface BaseViewProps extends React.HTMLAttributes<HTMLElement> {
  componentName?: ComponentName;
  jsStyle?: JSStyles;
  ref?: React.Ref<HTMLDivElement>;
  className?: undefined;
  grow?: boolean;
  shrink?: boolean;
  tag?: keyof HTMLElementTagNameMap;
}

export const BaseView = React.forwardRef(
  (
    {
      jsStyle,
      children,
      componentName = [],
      tag,
      grow,
      shrink,
      ...otherProps
    }: BaseViewProps,
    ref?: React.Ref<HTMLElement>
  ) => {
    const Tag: string = tag ?? "div";

    return (
      // @ts-ignore
      <Tag
        data-test-id={[...componentName, "BaseView"].join("-")}
        ref={ref}
        className={createClassNames(
          jsStyle,
          grow && jsStyles.grow,
          shrink && jsStyles.shrink
        )}
        {...otherProps}
      >
        {children}
      </Tag>
    );
  }
);
