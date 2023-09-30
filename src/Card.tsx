import { FlexLayout, FlexLayoutProps } from "./FlexLayout";
import { cssVar } from "./jss";

export interface CardProps extends FlexLayoutProps {}

export function Card({
  children,
  jsStyle,
  padding = "large",
  gap = "large",
  ...otherProps
}: CardProps) {
  return (
    <FlexLayout
      {...otherProps}
      padding={padding}
      gap={gap}
      jsStyle={[
        {
          backgroundColor: cssVar("--overlay-background"),
          borderRadius: cssVar("--border-radius-l"),
          boxShadow: "1px 1px 4px 1px #e0e0e0",
        },
        jsStyle,
      ]}
    >
      {children}
    </FlexLayout>
  );
}
