import React from "react";

import { BaseButton } from "./BaseButton";
import { BaseLink } from "./BaseLink";
import { BaseView } from "./BaseView";
import { Icon } from "./Icon";
import { FlexLayout, FlexLayoutProps } from "./FlexLayout";
import type { Tab } from "./Tabs";
import { Text } from "./Text";
import { useNavigation } from "./useNavigation";
import { JSS, Padding, Size, TextColor, cssVar, getMaterial } from "./jss";

export type TabBarVariant = "default" | "floating";

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

export function TabBar({
  tabs,
  variant = "default",
  direction = "row",
  fixed = false,
  iconSize = "large",
  labelSize = "small",
  tabPadding = "medium",
  jssTab,
  labelRenderer,
  jss,
  align = "stretch",
  "aria-label": ariaLabel = "Primary navigation",
  ...otherProps
}: TabBarProps) {
  const horizontal = direction === "row";
  const selectedIndex = tabs.findIndex((tab) => tab.selected === true);
  const root = useNavigation({
    initialIndex: selectedIndex === -1 ? 0 : selectedIndex,
  });

  return (
    <BaseView
      tag="nav"
      aria-label={ariaLabel}
      jss={[
        styles.root,
        styles[variant],
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
        jss={horizontal ? styles.horizontalBar : styles.verticalBar}
      >
        {tabs.map((tab) => {
          const { label, icon, href, onClick } = tab;
          const selected = tab.selected === true;
          const color: TextColor = selected ? "highlight" : "secondary";
          const tabJSS: JSS = [
            styles.item,
            horizontal ? styles.horizontalItem : styles.verticalItem,
            variant === "default" && styles.defaultItem,
            variant === "floating" &&
              horizontal &&
              styles.floatingHorizontalItem,
            selected && {
              backgroundColor: cssVar("--light-highlight"),
            },
            typeof jssTab === "function" ? jssTab({ selected }) : jssTab,
          ];
          const content = (
            <FlexLayout
              direction={horizontal ? "column" : "row"}
              align="center"
              justify="center"
              gap="small"
            >
              {icon && <Icon icon={icon} size={iconSize} color={color} />}
              <Text size={labelSize} color={color} ellipsis={true}>
                {labelRenderer ? labelRenderer(label) : label}
              </Text>
            </FlexLayout>
          );

          if (href != null) {
            return (
              <BaseLink
                key={label}
                href={href}
                onClick={onClick}
                aria-current={selected ? "page" : undefined}
                bare={true}
                color={selected ? "primary" : "secondary"}
                padding={tabPadding}
                jss={tabJSS}
              >
                {content}
              </BaseLink>
            );
          }

          return (
            <BaseButton
              key={label}
              onClick={() => onClick?.()}
              aria-current={selected ? "page" : undefined}
              bare={true}
              color={selected ? "primary" : "secondary"}
              padding={tabPadding}
              jss={tabJSS}
            >
              {content}
            </BaseButton>
          );
        })}
      </FlexLayout>
      {horizontal && <BaseView aria-hidden={true} jss={styles.safeArea} />}
    </BaseView>
  );
}
