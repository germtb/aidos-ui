import React, {
  useCallback,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BaseLink } from "./BaseLink";
import { Row, type RowProps } from "./Row";
import { JSS, Padding, Size, cssVar, getPadding } from "./jss";
import { Text } from "./Text";
import { BaseButton } from "./BaseButton";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import type { IconType } from "./IconType";
import { InlineRename } from "./InlineRename";
import { useRefEffect } from "./useRefEffect";
import { useTabReorder } from "./useTabReorder";

export type TabsVariant = "underline" | "segmented" | "document";
export type Tab = {
  id?: string;
  label: string;
  title?: string;
  icon?: IconType;
  href?: string;
  onClick?: () => void;
  onClose?: () => void;
  onRename?: (name: string) => void | Promise<void>;
  onContextMenu?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  panelId?: string;
  selected?: boolean;
  addOn?: ReactNode;
  addOnPosition?: "start" | "end";
};

export interface TabsProps extends RowProps {
  "aria-controls": string;
  tabs: Array<Tab>;
  onReorder?: (tabId: string, targetId: string) => void;
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
    tabs: inputTabs,
    onReorder,
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
    onFocus,
    bare = true,
    ...props
  }: TabsProps,
  ref?: React.Ref<HTMLElement>,
) {
  if (
    onReorder &&
    (inputTabs.some((tab) => !tab.id) ||
      new Set(inputTabs.map((tab) => tab.id)).size !== inputTabs.length)
  )
    throw new Error("Reorderable tabs require unique, nonempty ids.");
  const root = useRef<HTMLElement>(null);
  const instance = useId();
  const reorder = useTabReorder(inputTabs, onReorder);
  const tabs = reorder.tabs;
  const reorderRef = reorder.ref;
  const selectedTab = inputTabs.find((tab) => tab.selected) ?? inputTabs[0];
  const selectedIndex = tabs.indexOf(selectedTab);
  const [editing, setEditing] = useState<{
    id: string;
    anchor: HTMLElement;
  } | null>(null);
  const editingTab = tabs.find((tab) => (tab.id ?? tab.label) === editing?.id);
  const scroll = useRefEffect(
    useCallback(
      (element: HTMLElement) => {
        if (variant !== "document") return;
        const reveal = () =>
          revealTab(
            element,
            element.querySelector(
              ':scope > [data-aidos-tab]:not([data-aidos-reorder-ghost]) [aria-selected="true"]',
            ),
          );
        const observer = new ResizeObserver(reveal);
        observer.observe(element);
        const wheel = (event: WheelEvent) => {
          if (
            event.ctrlKey ||
            event.deltaX ||
            !event.deltaY ||
            element.scrollWidth <= element.clientWidth
          )
            return;
          event.preventDefault();
          const unit =
            event.deltaMode === 1
              ? 16
              : event.deltaMode === 2
                ? element.clientWidth
                : 1;
          element.scrollLeft += event.deltaY * unit;
        };
        element.addEventListener("wheel", wheel, { passive: false });
        reveal();
        return () => {
          observer.disconnect();
          element.removeEventListener("wheel", wheel);
        };
      },
      [variant],
    ),
  );
  const mount = useCallback(
    (element: HTMLElement | null) => {
      root.current = element;
      reorderRef(element);
      scroll(element);
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    },
    [ref, reorderRef, scroll],
  );
  const elements = () =>
    Array.from(
      root.current?.querySelectorAll<HTMLElement>(
        ':scope > [data-aidos-tab]:not([data-aidos-reorder-ghost]) > [role="tab"]',
      ) ?? [],
    );
  const rename = (tab: Tab, anchor: HTMLElement) => {
    if (tab.onRename) setEditing({ id: tab.id ?? tab.label, anchor });
  };
  const closeTab = (index: number) => {
    const tab = tabs[index];
    const next = tabs[index + 1] ?? tabs[index - 1];
    const target = index === selectedIndex ? next : tabs[selectedIndex];
    const targetIndex = tabs.indexOf(target);
    elements()[targetIndex]?.focus();
    tab.onClose?.();
  };
  return (
    <>
      <Row
        {...props}
        role="tablist"
        ref={mount}
        onFocus={(event) => {
          onFocus?.(event);
          if (variant === "document")
            revealTab(event.currentTarget, event.target);
        }}
        gap={gap}
        padding={padding}
        jss={[
          { minWidth: 0, maxWidth: "100%", position: "relative" },
          variant === "segmented" && {
            background: cssVar("--hovered-background"),
            borderRadius: cssVar("--border-radius-l"),
            padding: cssVar("--spacing-xs"),
            width: "fit-content",
          },
          variant === "document" && {
            overflowX: "auto",
            overflowY: "hidden",
            overscrollBehavior: "none",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": { display: "none" },
            alignItems: "center",
            gap: 3,
            padding: 3,
          },
          jss,
        ]}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || event.nativeEvent.isComposing) return;
          const buttons = elements();
          const index = buttons.indexOf(event.target as HTMLElement);
          if (index < 0) return;
          const tab = tabs[index];
          if (
            onReorder &&
            event.altKey &&
            event.shiftKey &&
            !event.ctrlKey &&
            !event.metaKey &&
            (event.key === "ArrowLeft" || event.key === "ArrowRight")
          ) {
            event.preventDefault();
            event.stopPropagation();
            const direction =
              getComputedStyle(event.currentTarget).direction === "rtl"
                ? -1
                : 1;
            reorder.move(
              tab.id,
              index + (event.key === "ArrowRight" ? direction : -direction),
            );
            queueMicrotask(() =>
              buttons[index]?.focus({ preventScroll: true }),
            );
            return;
          }
          if (event.altKey || event.metaKey || event.ctrlKey) return;
          if (event.key === "F2" && tab.onRename) {
            event.preventDefault();
            rename(tab, buttons[index]);
            return;
          }
          if (
            tab.onContextMenu &&
            (event.key === "ContextMenu" ||
              (event.shiftKey && event.key === "F10"))
          ) {
            event.preventDefault();
            tab.onContextMenu(event);
            return;
          }
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
          buttons[next]?.focus();
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
              data-aidos-tab
              data-aidos-reorder-item={onReorder ? id : undefined}
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
                ref={(element) => {
                  if (selected && variant === "document" && root.current)
                    revealTab(root.current, element);
                }}
                aria-keyshortcuts={
                  [
                    onReorder && "Alt+Shift+ArrowLeft Alt+Shift+ArrowRight",
                    tab.onRename && "F2",
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined
                }
                aria-describedby={
                  onReorder ? `${instance}-reorder-help` : undefined
                }
                aria-controls={panelId ?? ariaControls}
                role="tab"
                title={tab.title ?? label}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                bare={bare}
                color={selected ? "primary" : "secondary"}
                href={href}
                onClick={onClick}
                onDoubleClick={(event) => rename(tab, event.currentTarget)}
                onContextMenu={
                  tab.onContextMenu
                    ? (event) => {
                        event.preventDefault();
                        event.currentTarget.focus({ preventScroll: true });
                        tab.onContextMenu(event);
                      }
                    : undefined
                }
                animateInteraction={false}
                jss={[
                  {
                    minWidth: 0,
                    touchAction: onReorder ? "pan-y" : undefined,
                    userSelect: onReorder ? "none" : undefined,
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
      {onReorder && (
        <>
          <span id={`${instance}-reorder-help`} hidden>
            Use Alt+Shift+Left or Right Arrow to reorder.
          </span>
          <span
            role="status"
            aria-live="polite"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              overflow: "hidden",
              clipPath: "inset(50%)",
              whiteSpace: "nowrap",
            }}
          >
            {reorder.announcement}
          </span>
        </>
      )}
      {editing && editingTab?.onRename && (
        <InlineRename
          key={editing.id}
          anchor={editing.anchor}
          initialValue={editingTab.label}
          label={`Rename ${editingTab.label}`}
          size={labelSize}
          onSave={editingTab.onRename}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
});

function revealTab(root: HTMLElement, target: Element | null) {
  if (root.hasAttribute("data-aidos-reordering")) return;
  const item = target?.closest("[data-aidos-tab]");
  if (!item || !root.contains(item)) return;
  const box = item.getBoundingClientRect();
  const viewport = root.getBoundingClientRect();
  if (box.left < viewport.left) root.scrollLeft += box.left - viewport.left;
  else if (box.right > viewport.right)
    root.scrollLeft += Math.min(
      box.right - viewport.right,
      box.left - viewport.left,
    );
}
