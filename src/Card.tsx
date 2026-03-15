import { FlexLayout, FlexLayoutProps } from "./FlexLayout";
import { cssVar } from "./jss";

export interface CardProps extends FlexLayoutProps {}

export function Card({
  children,
  jss,
  padding = "large",
  gap = "large",
  ...otherProps
}: CardProps) {
  return (
    <FlexLayout
      {...otherProps}
      padding={padding}
      gap={gap}
      jss={[
        {
          backgroundColor: cssVar("--overlay-background"),
          borderRadius: cssVar("--border-radius-l"),
          boxShadow: cssVar("--shadow-sm"),
        },
        jss,
      ]}
    >
      {children}
    </FlexLayout>
  );
}
