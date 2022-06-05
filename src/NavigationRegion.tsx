import React from "react";
import { createClassNames, JSStyles } from "./Palette";

export interface NavigationRegionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  jsStyle?: JSStyles;
  ref?: React.Ref<HTMLDivElement>;
  "aria-role": string;
  className?: undefined;
}

function NavigationRegion(
  { jsStyle, children, ...otherProps }: NavigationRegionProps,
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <nav ref={ref} className={createClassNames(jsStyle)} {...otherProps}>
      {children}
    </nav>
  );
}

export default React.forwardRef(NavigationRegion);
