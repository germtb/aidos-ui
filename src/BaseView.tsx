import React from "react";
import { JSS, Material, getMaterial, toClassnames } from "./jss";
import { useGlassRef } from "./useGlassRef";

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
  material?: Material;
  ref?: React.Ref<HTMLDivElement>;
  className?: undefined;
  grow?: boolean;
  shrink?: boolean;
  relative?: boolean;
  tag?: keyof HTMLElementTagNameMap;
}

export const BaseView = React.forwardRef(function BaseView(
  {
    jss,
    material,
    children,
    tag,
    grow,
    shrink,
    relative,
    ...otherProps
  }: BaseViewProps,
  ref?: React.Ref<HTMLElement>,
) {
  const Tag: React.ElementType = tag ?? "div";
  const stylesJSS = [material && getMaterial(material), jss];
  const surfaceRef = useGlassRef(stylesJSS, ref);

  return React.createElement(
    Tag,
    {
      ...otherProps,
      ref: surfaceRef,
      className: toClassnames([
        stylesJSS,
        grow && styles.grow,
        shrink && styles.shrink,
        relative && styles.relative,
      ]),
    },
    children,
  );
});
