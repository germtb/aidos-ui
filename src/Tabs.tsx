import React, { useId, useRef, type ReactNode } from "react";
import { BaseLink } from "./BaseLink";
import { Row, type RowProps } from "./Row";
import { JSS, Padding, Size, cssVar, getPadding } from "./jss";
import { Text } from "./Text";
import { BaseButton } from "./BaseButton";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import type { IconType } from "./IconType";

export type TabsVariant = "underline" | "segmented" | "document";
export type Tab = {
  id?: string;
  label: string;
  title?: string;
  icon?: IconType;
  href?: string;
  onClick?: () => void;
  onClose?: () => void;
  panelId?: string;
  selected?: boolean;
  addOn?: ReactNode;
  addOnPosition?: "start" | "end";
};

export interface TabsProps extends RowProps {
  "aria-controls": string;
  tabs: Array<Tab>;
  variant?: TabsVariant;
  labelSize?: Size;
  iconSize?: Size;
  bare?: boolean;
  tabPadding?: Padding;
  jssTab?: JSS | ((data: { selected: boolean }) => JSS);
  labelRenderer?: (label: string) => ReactNode;
}

export const Tabs = React.forwardRef(function Tabs(
  {
    tabs,
    variant = "underline",
    gap = "none",
    padding = "none",
    tabPadding = variant === "document" ? ["small", "medium"] : "medium",
    labelSize = variant === "document" ? "small" : "large",
    iconSize = "medium",
    jss,
    jssTab,
    labelRenderer,
    "aria-controls": ariaControls,
    onKeyDown,
    bare = true,
    ...props
  }: TabsProps,
  ref?: React.Ref<HTMLElement>,
) {
  const root = useRef<HTMLElement>(null);
  const lastSelected = useRef<string>(undefined);
  const instance = useId();
  const selectedIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.selected),
  );
  const selectedId = tabs[selectedIndex]?.id ?? tabs[selectedIndex]?.label;
  const closeTab = (index: number) => {
    const tab = tabs[index];
    const next = tabs[index + 1] ?? tabs[index - 1];
    const target = index === selectedIndex ? next : tabs[selectedIndex];
    const targetIndex = tabs.indexOf(target);
    root.current
      ?.querySelectorAll<HTMLElement>('[role="tab"]')
      [targetIndex]?.focus();
    tab.onClose?.();
  };
  return (
    <Row
      {...props}
      role="tablist"
      ref={(element) => {
        root.current = element;
        if (typeof ref === "function") ref(element);
        else if (ref) ref.current = element;
        if (element && selectedId !== lastSelected.current) {
          const tab = element.querySelector('[aria-selected="true"]');
          if (tab && variant === "document") {
            const box = tab.getBoundingClientRect();
            const viewport = element.getBoundingClientRect();
            if (box.left < viewport.left)
              element.scrollLeft -= viewport.left - box.left;
            else if (box.right > viewport.right)
              element.scrollLeft += box.right - viewport.right;
          }
          lastSelected.current = selectedId;
        }
      }}
      gap={gap}
      padding={padding}
      jss={[
        { minWidth: 0, maxWidth: "100%" },
        variant === "segmented" && {
          background: cssVar("--hovered-background"),
          borderRadius: cssVar("--border-radius-l"),
          padding: cssVar("--spacing-xs"),
          width: "fit-content",
        },
        variant === "document" && {
          overflowX: "auto",
          overscrollBehavior: "contain",
          scrollbarWidth: "thin",
          alignItems: "center",
          gap: 3,
          padding: 3,
        },
        jss,
      ]}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          event.defaultPrevented ||
          event.nativeEvent.isComposing ||
          event.altKey ||
          event.metaKey ||
          event.ctrlKey
        )
          return;
        const elements = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'),
        );
        const index = elements.indexOf(event.target as HTMLElement);
        if (index < 0) return;
        if (event.key === "Delete" && tabs[index].onClose) {
          event.preventDefault();
          closeTab(index);
          return;
        }
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : event.key === "ArrowRight"
                ? (index + 1) % tabs.length
                : event.key === "ArrowLeft"
                  ? (index - 1 + tabs.length) % tabs.length
                  : -1;
        if (next < 0) return;
        event.preventDefault();
        event.stopPropagation();
        elements[next]?.focus();
        tabs[next]?.onClick?.();
      }}
    >
      {tabs.map((tab, index) => {
        const {
          id,
          label,
          icon,
          href,
          onClick,
          onClose,
          panelId,
          addOn,
          addOnPosition = "start",
        } = tab;
        const selected = index === selectedIndex;
        const BaseComponent = href != null ? BaseLink : BaseButton;
        return (
          <Row
            key={id ?? label}
            data-aidos-action-scope
            align="center"
            gap="none"
            jss={[
              { minWidth: 0 },
              variant === "document" && {
                height: 30,
                minWidth: 110,
                maxWidth: 220,
                flexShrink: 0,
                borderRadius: 6,
                background: selected
                  ? cssVar("--light-highlight")
                  : "transparent",
                ":hover": {
                  background: selected
                    ? cssVar("--light-highlight")
                    : cssVar("--hovered-background"),
                },
              },
            ]}
          >
            <BaseComponent
              id={id ?? `${instance}-${index}`}
              aria-controls={panelId ?? ariaControls}
              role="tab"
              title={tab.title ?? label}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              bare={bare}
              color={selected ? "primary" : "secondary"}
              href={href}
              onClick={onClick}
              animateInteraction={false}
              jss={[
                {
                  minWidth: 0,
                  flex: 1,
                  alignItems: "center",
                  gap: cssVar("--spacing-s"),
                  textDecoration: "none",
                  ":focus-visible": { outlineOffset: -2 },
                },
                variant === "underline" && {
                  borderBottom: `3px solid ${selected ? cssVar("--highlight") : "transparent"}`,
                  borderRadius:
                    "var(--border-radius-s) var(--border-radius-s) 0 0",
                  ":hover": { background: cssVar("--hovered-background") },
                },
                variant === "segmented" && {
                  borderRadius: cssVar("--border-radius-m"),
                  background: selected
                    ? cssVar("--overlay-background")
                    : "transparent",
                  boxShadow: selected ? cssVar("--shadow-sm") : "none",
                },
                variant === "document" && {
                  height: "100%",
                  borderRadius: 6,
                  background: "transparent",
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
                  jss={{ flexShrink: 0 }}
                />
              )}
              <Text
                size={labelSize}
                color={selected ? "primary" : "secondary"}
                jss={{ minWidth: 0 }}
              >
                {labelRenderer ? labelRenderer(label) : label}
              </Text>
              {addOnPosition === "end" && addOn}
            </BaseComponent>
            {onClose && (
              <IconButton
                data-aidos-actions
                aria-label={`Close ${label}`}
                tabIndex={selected ? 0 : -1}
                bare
                color="secondary"
                icon="x"
                size="xsmall"
                onClick={() => closeTab(index)}
                jss={{
                  borderRadius: 5,
                  marginInlineEnd: 3,
                  opacity: selected ? 1 : 0,
                  ":focus-visible": { opacity: 1, outlineOffset: -2 },
                  "@media (hover: none)": { opacity: 1 },
                }}
              />
            )}
          </Row>
        );
      })}
    </Row>
  );
});
