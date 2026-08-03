import { BaseLink } from "./BaseLink";
import { Row, RowProps } from "./Row";
import { JSS, Padding, Size, cssVar, getPadding } from "./jss";
import { useNavigation } from "./useNavigation";
import { Text } from "./Text";
import { ReactNode } from "react";
import { BaseButton } from "./BaseButton";
import { Icon } from "./Icon";
import type { IconType } from "./IconType";

export type TabsVariant = "underline" | "segmented";

export type Tab = {
  label: string;
  icon?: IconType;
  href?: string;
  onClick?: () => void;
  selected?: boolean;
  addOn?: ReactNode;
  addOnPosition?: "start" | "end";
};

export interface TabsProps extends RowProps {
  ["aria-controls"]: string;
  tabs: Array<Tab>;
  variant?: TabsVariant;
  labelSize?: Size;
  iconSize?: Size;
  bare?: boolean;
  tabPadding?: Padding;
  jssTab?: JSS | ((data: { selected: boolean }) => JSS);
  labelRenderer?: (label: string) => ReactNode;
}

export function Tabs({
  tabs,
  variant = "underline",
  gap = "none",
  padding = "none",
  tabPadding = "medium",
  labelSize = "large",
  iconSize = "medium",
  jss,
  jssTab,
  labelRenderer,
  ["aria-controls"]: ariaControls,
  ...otherProps
}: TabsProps) {
  const root = useNavigation();

  return (
    <Row
      role="tablist"
      jss={[
        variant === "segmented" && {
          isolation: "isolate",
          backgroundColor: cssVar("--hovered-background"),
          borderRadius: cssVar("--border-radius-l"),
          maxWidth: "100%",
          padding: cssVar("--spacing-xs"),
          width: "fit-content",
        },
        jss,
      ]}
      gap={gap}
      padding={padding}
      ref={root}
      {...otherProps}
    >
      {tabs.map(
        ({
          label,
          icon,
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
              color={selected ? "primary" : "secondary"}
              href={href}
              onClick={onClick}
              animateInteraction={false}
              jss={[
                {
                  alignItems: "center",
                  gap: cssVar("--spacing-s"),
                  textDecoration: "none",
                },
                variant === "underline" && {
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
                variant === "segmented" && {
                  position: "relative",
                  zIndex: selected ? 1 : 0,
                  borderRadius: cssVar("--border-radius-m"),
                  backgroundColor: selected
                    ? cssVar("--overlay-background")
                    : "transparent",
                  boxShadow: selected
                    ? `0 0 0 1px ${cssVar("--divider")}, 0 0 4px color-mix(in srgb, ${cssVar("--primary-text")} 10%, transparent)`
                    : "none",
                  transition: `background-color ${cssVar("--transition-fast")}, box-shadow ${cssVar("--transition-fast")}`,
                  ":hover": {
                    backgroundColor: selected
                      ? cssVar("--overlay-background")
                      : cssVar("--hovered-background"),
                  },
                  ":active:hover": {
                    top: 1,
                    backgroundColor: cssVar("--pressed-background"),
                  },
                },
                getPadding(tabPadding),
                typeof jssTab === "function" ? jssTab({ selected }) : jssTab,
              ]}
            >
              {addOnPosition === "start" && addOn}
              {icon && (
                <Icon
                  icon={icon}
                  size={iconSize}
                  color={selected ? "primary" : "secondary"}
                />
              )}
              <Text size={labelSize} color={selected ? "primary" : "secondary"}>
                {labelRenderer ? labelRenderer(label) : label}
              </Text>
              {addOnPosition === "end" && addOn}
            </BaseComponent>
          );
        },
      )}
    </Row>
  );
}
