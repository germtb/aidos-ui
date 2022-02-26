import React from "react";
import { createClassNames, JSStyles } from "./Palette";

export interface BaseViewProps extends React.HTMLAttributes<HTMLDivElement> {
  componentName?: string;
  jsStyle?: JSStyles;
  ref?: React.Ref<HTMLDivElement>;
  className?: undefined;
}

function BaseView(
  { jsStyle, children, componentName, ...otherProps }: BaseViewProps,
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <div
      data-test-id={componentName ?? "BaseView"}
      ref={ref}
      className={createClassNames(jsStyle)}
      {...otherProps}
    >
      {children}
    </div>
  );
}

export default React.forwardRef(BaseView);
