import { BaseLink } from "./BaseLink";
import { Row, RowProps } from "./Row";
import { JSStyle, Padding, Size, cssVar, getPadding } from "./jss";
import { useNavigation } from "./useNavigation";
import { Text } from "./Text";
import { ReactNode } from "react";

export type Tab = {
  label: string;
  href?: string;
  onClick?: () => void;
  selected?: boolean;
  addOn?: ReactNode;
  addOnPosition?: "start" | "end";
};

export interface TabsProps extends RowProps {
  ["aria-controls"]: string;
  tabs: Array<Tab>;
  labelSize?: Size;
  bare?: boolean;
  tabPadding?: Padding;
  tabJSStyle?: JSStyle;
}

export function Tabs({
  tabs,
  gap = "none",
  padding = "none",
  tabPadding = "medium",
  labelSize = "large",
  jsStyle,
  tabJSStyle,
  ["aria-controls"]: ariaControls,
  ...otherProps
}: TabsProps) {
  const root = useNavigation();

  return (
    <Row
      role="tablist"
      jsStyle={jsStyle}
      gap={gap}
      padding={padding}
      ref={root}
      {...otherProps}
    >
      {tabs.map(
        ({
          label,
          href,
          onClick,
          selected,
          addOn,
          addOnPosition = "start",
        }) => (
          <BaseLink
            aria-controls={ariaControls}
            role="tab"
            aria-selected={selected ? "true" : undefined}
            key={label}
            bare
            color={selected ? "positive" : "primary"}
            href={href}
            onClick={onClick}
            animateInteraction={false}
            jsStyle={[
              {
                textDecoration: "none",
                borderBottom: selected
                  ? `3px solid ${cssVar("--highlight")}`
                  : `3px solid transparent`,
                ":active span": {
                  transform: "scale(0.97)",
                },
                ":first-child": {
                  borderTopLeftRadius: cssVar("--border-radius-m"),
                },
                ":last-child": {
                  borderTopRightRadius: cssVar("--border-radius-m"),
                },
                ":hover": {
                  backgroundColor: cssVar("--hovered-background"),
                },
                ":active:hover": {
                  backgroundColor: cssVar("--pressed-background"),
                },
              },
              getPadding(tabPadding),
              tabJSStyle,
            ]}
          >
            {addOnPosition === "start" && addOn}
            <Text size={labelSize} color={selected ? "primary" : "secondary"}>
              {label}
            </Text>
            {addOnPosition === "end" && addOn}
          </BaseLink>
        )
      )}
    </Row>
  );
}
