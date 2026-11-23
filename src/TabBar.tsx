import React from "react";

import { BaseButton } from "./BaseButton";
import { BaseLink } from "./BaseLink";
import { BaseView } from "./BaseView";
import { Icon } from "./Icon";
import { FlexLayout, FlexLayoutProps } from "./FlexLayout";
import type { Tab } from "./Tabs";
import { Text } from "./Text";
import { Tooltip } from "./Tooltip";
import { useNavigation } from "./useNavigation";
import { JSS, Padding, Size, TextColor, cssVar, getMaterial } from "./jss";

export type TabBarVariant = "default" | "floating" | "rail";

export interface TabBarProps extends Omit<FlexLayoutProps, "children" | "tag"> {
  tabs: Tab[];
  variant?: TabBarVariant;
  fixed?: boolean;
  iconSize?: Size;
  labelSize?: Size;
  tabPadding?: Padding;
  jssTab?: JSS | ((data: { selected: boolean }) => JSS);
  labelRenderer?: (label: string) => React.ReactNode;
}

const styles: { [key: string]: JSS } = {
  root: {},
  default: {
    backgroundColor: cssVar("--nav-bar"),
  },
  floating: [
    getMaterial("aurora"),
    {
      borderRadius: cssVar("--border-radius-xl"),
      boxShadow: cssVar("--shadow-md"),
    },
  ],
  rail: { width: 48 },
  railBar: { width: "100%", gap: 4, padding: "4px 6px" },
  railItem: { width: 36, height: 36, padding: 0, borderRadius: 10 },
  horizontal: {
    width: "100%",
  },
  vertical: {
    width: "max-content",
    height: "100%",
  },
  horizontalBar: {
    width: "100%",
    minHeight: cssVar("--nav-bar-height"),
  },
  verticalBar: {
    minWidth: cssVar("--nav-bar-height"),
    height: "100%",
  },
  safeArea: {
    width: "100%",
    height: "env(safe-area-inset-bottom)",
    flexShrink: 0,
  },
  fixed: {
    position: "fixed",
    left: 0,
    bottom: 0,
    zIndex: 1,
  },
  fixedHorizontal: {
    right: 0,
  },
  fixedVertical: {
    top: 0,
  },
  item: {
    borderRadius: cssVar("--border-radius-l"),
    justifyContent: "center",
    textDecoration: "none",
    userSelect: "none",
    ":focus-visible": {
      outlineOffset: -2,
    },
  },
  horizontalItem: {
    flex: 1,
    minWidth: 0,
  },
  defaultItem: {
    borderRadius: 0,
  },
  floatingHorizontalItem: {
    minWidth: "auto",
  },
  verticalItem: {
    width: "100%",
  },
};

export const TabBar = React.forwardRef(function TabBar(
  {
    tabs,
    variant = "default",
    material,
    direction = variant === "rail" ? "column" : "row",
    fixed = false,
    iconSize = variant === "rail" ? "medium" : "large",
    labelSize = "small",
    tabPadding = "medium",
    jssTab,
    labelRenderer,
    jss,
    align = "stretch",
    "aria-label": ariaLabel = "Primary navigation",
    ...otherProps
  }: TabBarProps,
  ref?: React.Ref<HTMLElement>,
) {
  const horizontal = direction === "row";
  const selectedIndex = tabs.findIndex((tab) => tab.selected === true);
  const root = useNavigation({
    initialIndex: selectedIndex === -1 ? 0 : selectedIndex,
    orientation: horizontal ? "horizontal" : "vertical",
  });

  return (
    <BaseView
      ref={ref}
      tag="nav"
      aria-label={ariaLabel}
      jss={[
        styles.root,
        styles[variant],
        material && getMaterial(material),
        variant === "default" &&
          (horizontal ? styles.horizontal : styles.vertical),
        fixed && styles.fixed,
        fixed && (horizontal ? styles.fixedHorizontal : styles.fixedVertical),
        jss,
      ]}
    >
      <FlexLayout
        ref={root}
        {...otherProps}
        direction={direction}
        align={align}
        jss={
          variant === "rail"
            ? styles.railBar
            : horizontal
              ? styles.horizontalBar
              : styles.verticalBar
        }
      >
        {tabs.map((tab) => {
          const { label, icon, href, onClick } = tab;
          const selected = tab.selected === true;
          const color: TextColor =
            variant === "rail"
              ? selected
                ? "light"
                : "primary"
              : selected
                ? "highlight"
                : "secondary";
          const tabJSS: JSS = [
            styles.item,
            horizontal ? styles.horizontalItem : styles.verticalItem,
            variant === "default" && styles.defaultItem,
            variant === "floating" &&
              horizontal &&
              styles.floatingHorizontalItem,
            selected && {
              backgroundColor: cssVar(
                variant === "rail" ? "--highlight" : "--light-highlight",
              ),
            },
            variant === "rail" && styles.railItem,
            typeof jssTab === "function" ? jssTab({ selected }) : jssTab,
          ];
          const content = (
            <FlexLayout
              direction={horizontal ? "column" : "row"}
              align="center"
              justify="center"
              gap="small"
            >
              {variant === "rail" && !icon && (
                <Text color={color}>{label.slice(0, 1)}</Text>
              )}
              {icon && <Icon icon={icon} size={iconSize} color={color} />}
              {variant !== "rail" && (
                <Text size={labelSize} color={color} ellipsis={true}>
                  {labelRenderer ? labelRenderer(label) : label}
                </Text>
              )}
            </FlexLayout>
          );

          const item =
            href != null ? (
              <BaseLink
                href={href}
                onClick={onClick}
                aria-label={variant === "rail" ? label : undefined}
                aria-current={selected ? "page" : undefined}
                bare
                color={selected ? "primary" : "secondary"}
                padding={tabPadding}
                jss={tabJSS}
              >
                {content}
              </BaseLink>
            ) : (
              <BaseButton
                onClick={() => onClick?.()}
                aria-label={variant === "rail" ? label : undefined}
                aria-current={selected ? "page" : undefined}
                bare
                color={selected ? "primary" : "secondary"}
                padding={tabPadding}
                jss={tabJSS}
              >
                {content}
              </BaseButton>
            );
          return variant === "rail" ? (
            <Tooltip key={label} content={label} placement="right">
              {item}
            </Tooltip>
          ) : (
            <React.Fragment key={label}>{item}</React.Fragment>
          );
        })}
      </FlexLayout>
      {horizontal && <BaseView aria-hidden={true} jss={styles.safeArea} />}
    </BaseView>
  );
});
