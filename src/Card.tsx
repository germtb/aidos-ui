import { FlexLayout, FlexLayoutProps } from "./FlexLayout";
import { JSS, Material, cssVar, getMaterial } from "./jss";

export type CardVariant = "default" | "tonal" | "floating" | "flat";

export interface CardProps extends FlexLayoutProps {
  variant?: CardVariant;
  material?: Material;
}

const variantStyles: { [variant in CardVariant]: JSS } = {
  default: {
    backgroundColor: cssVar("--overlay-background"),
    boxShadow: cssVar("--shadow-sm"),
  },
  tonal: {
    backgroundColor: cssVar("--secondary-background"),
    border: `1px solid ${cssVar("--divider")}`,
  },
  floating: {
    backgroundColor: cssVar("--overlay-background"),
    borderRadius: cssVar("--border-radius-xl"),
    boxShadow: cssVar("--shadow-lg"),
  },
  flat: {
    backgroundColor: cssVar("--overlay-background"),
    borderRadius: 0,
    boxShadow: "none",
  },
};

export function Card({
  children,
  jss,
  padding = "large",
  gap = "large",
  variant = "default",
  material,
  ...otherProps
}: CardProps) {
  return (
    <FlexLayout
      {...otherProps}
      padding={padding}
      gap={gap}
      jss={[
        {
          borderRadius: cssVar("--border-radius-l"),
        },
        variantStyles[variant],
        material && getMaterial(material),
        jss,
      ]}
    >
      {children}
    </FlexLayout>
  );
}
