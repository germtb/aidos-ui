import { BaseLink } from "./BaseLink";
import { Row, RowProps } from "./Row";
import { JSStyle, Padding, Size, cssVar, getPadding } from "./jss";
import { useNavigation } from "./useNavigation";
import { Text } from "./Text";
import { ReactNode } from "react";
import { BaseButton } from "./BaseButton";

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
  tabJSStyle?: JSStyle | ((data: { selected: boolean }) => JSStyle);
  labelRenderer?: (label: string) => ReactNode;
}

export function Tabs({
  tabs,
  gap = "none",
  padding = "none",
  tabPadding = "medium",
  labelSize = "large",
  jss,
  tabJSStyle,
  labelRenderer,
  ["aria-controls"]: ariaControls,
  ...otherProps
}: TabsProps) {
  const root = useNavigation();

  return (
    <Row
      role="tablist"
      jss={jss}
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
        }) => {
          const BaseComponent = href != null ? BaseLink : BaseButton;

          return (
            <BaseComponent
              aria-controls={ariaControls}
              role="tab"
              aria-selected={selected ? "true" : undefined}
              key={label}
              bare
              color={selected ? "positive" : "primary"}
              href={href}
              onClick={onClick}
              animateInteraction={false}
              jss={[
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
                typeof tabJSStyle === "function"
                  ? tabJSStyle({ selected })
                  : tabJSStyle,
              ]}
            >
              {addOnPosition === "start" && addOn}
              <Text size={labelSize} color={selected ? "primary" : "secondary"}>
                {labelRenderer ? labelRenderer(label) : label}
              </Text>
              {addOnPosition === "end" && addOn}
            </BaseComponent>
          );
        }
      )}
    </Row>
  );
}
