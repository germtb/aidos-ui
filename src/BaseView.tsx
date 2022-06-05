import React from "react";
import { Color, createClassNames, createJSStyles, JSStyles } from "./Palette";

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

function BaseView(
  { jsStyle, children, componentName = [], tag, ...otherProps }: BaseViewProps,
  ref?: React.Ref<HTMLElement>
) {
  const Tag: string = tag ?? "div";

  return (
    // @ts-ignore
    <Tag
      data-test-id={[...componentName, "BaseView"].join("-")}
      ref={ref}
      className={createClassNames(jsStyle)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
}

export default React.forwardRef(BaseView);
