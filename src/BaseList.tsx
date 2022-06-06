import React from "react";
import { createClassNames, JSStyles, createJSStyles } from "./Palette";

const jsStyles = createJSStyles({
  root: {
    backgroundColor: "var(--primary-background)",
    display: "flex",
    flexDirection: "column",
  },
});

export interface BaseListProps extends React.HTMLAttributes<HTMLUListElement> {
  jsStyle?: JSStyles;
  className?: undefined;
  componentName?: string;
}

export const BaseList = React.forwardRef(
  (
    { jsStyle, componentName, ...otherProps }: BaseListProps,
    ref?: React.Ref<HTMLUListElement>
  ) => {
    return (
      <ul
        {...otherProps}
        data-test-id={componentName ?? "BaseList"}
        className={createClassNames(jsStyles.root, jsStyle)}
        ref={ref}
      />
    );
  }
);
