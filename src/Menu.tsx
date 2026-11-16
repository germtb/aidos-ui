import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { BaseView } from "./BaseView";
import { Row } from "./Row";
import { focusInitialElement } from "./aria";
import { PopoverNavigationContext } from "./popoverNavigation";
import { useRefEffect } from "./useRefEffect";
import { BaseButton, type BaseButtonProps } from "./BaseButton";
import { Column, type ColumnProps } from "./Column";
import { Icon } from "./Icon";
import type { IconType } from "./IconType";
import { Span } from "./Text";
import { TooltipTrigger } from "./Tooltip";
import { useNavigation } from "./useNavigation";
import { cssVar } from "./jss";

const MenuContext = createContext<() => void>(() => {});

export interface MenuProps extends Omit<ColumnProps, "role"> {
  label: string;
  onClose?: () => void;
  autoFocus?: boolean;
}

export function Menu({
  label,
  onClose,
  autoFocus = false,
  children,
  jss,
  ...props
}: MenuProps) {
  const parentClose = useContext(MenuContext);
  const navigation = useNavigation({
    orientation: "vertical",
    autofocus: autoFocus,
  });
  return (
    <MenuContext.Provider value={onClose ?? parentClose}>
      <Column
        {...props}
        ref={navigation}
        role="menu"
        aria-label={label}
        gap="none"
        jss={[
          {
            minWidth: "min(220px, calc(100vw - 32px))",
            maxHeight: "min(360px, calc(100dvh - 32px))",
            overflowY: "auto",
          },
          jss,
        ]}
      >
        {children}
      </Column>
    </MenuContext.Provider>
  );
}

export interface MenuItemProps extends Omit<
  BaseButtonProps,
  "color" | "children"
> {
  children: ReactNode;
  icon?: IconType;
  description?: string;
  trailing?: ReactNode;
  checked?: boolean;
  destructive?: boolean;
}

export function MenuItem({
  children,
  icon,
  description,
  title,
  trailing,
  checked,
  destructive = false,
  disabled,
  jss,
  onClick,
  role = checked == null ? "menuitem" : "menuitemcheckbox",
  ...props
}: MenuItemProps) {
  const close = useContext(MenuContext);
  return (
    <TooltipTrigger
      placement="right"
      align="start"
      jss={{ display: "block", flexShrink: 0 }}
      content={(anchor) => {
        const label = anchor.querySelector<HTMLElement>(
          "[data-aidos-menu-label]",
        );
        const text = label?.textContent?.trim() ?? "";
        const truncated = label && label.scrollWidth > label.clientWidth;
        const detail = title ?? description;
        return {
          text:
            title ??
            [truncated && text, description].filter(Boolean).join("\n"),
          description: detail !== text ? detail : undefined,
        };
      }}
    >
      <BaseButton
        {...props}
        role={role}
        aria-checked={checked}
        bare
        color={destructive ? "negative" : "secondary"}
        disabled={disabled}
        animateInteraction={false}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) close();
        }}
        jss={[
          {
            width: "100%",
            minHeight: 32,
            padding: "6px 10px",
            gap: 8,
            textAlign: "left",
            minWidth: 0,
            borderRadius: cssVar("--border-radius-s"),
            color: cssVar(
              disabled
                ? "--subtle-text"
                : destructive
                  ? "--negative-text"
                  : "--primary-text",
            ),
            ":hover": {
              background: cssVar("--hovered-background"),
              filter: "none",
            },
            ":focus-visible": { outlineOffset: -2 },
          },
          jss,
        ]}
      >
        {icon && (
          <Icon
            icon={icon}
            size="small"
            color="inherit"
            jss={{ width: 14, height: 14, flexShrink: 0 }}
          />
        )}
        <Span
          data-aidos-menu-label
          size="small"
          color="inherit"
          jss={{ minWidth: 0, flex: 1 }}
        >
          {children}
        </Span>
        {trailing && (
          <Span size="small" color="secondary" jss={{ flexShrink: 0 }}>
            {trailing}
          </Span>
        )}
        {checked != null && (
          <span aria-hidden style={{ width: 14, flexShrink: 0 }}>
            {(checked || role === "menuitemcheckbox") && (
              <Icon
                icon={checked ? "check" : "square"}
                size="small"
                color="inherit"
              />
            )}
          </span>
        )}
      </BaseButton>
    </TooltipTrigger>
  );
}

export interface MenuSubmenuProps {
  label: string;
  children: ReactNode | ((props: { back: () => void }) => ReactNode);
  icon?: IconType;
  trailing?: string;
  disabled?: boolean;
}

export function MenuSubmenu({
  label,
  children,
  icon,
  trailing,
  disabled,
}: MenuSubmenuProps) {
  const navigation = useContext(PopoverNavigationContext);
  const id = useId();
  const mount = useRefEffect(
    useCallback((element: HTMLElement) => {
      let mounted = true;
      queueMicrotask(() => {
        if (mounted) focusInitialElement(element);
      });
      return () => {
        mounted = false;
      };
    }, []),
  );
  if (!navigation) throw new Error("MenuSubmenu requires a Popover.");
  const open = navigation.pages.includes(id);
  const active = navigation.pages[navigation.pages.length - 1] === id;
  return (
    <>
      <MenuItem
        icon={icon}
        disabled={disabled}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        trailing={
          <Row tag="span" align="center" gap="small">
            {trailing && (
              <Span size="small" color="inherit">
                {trailing}
              </Span>
            )}
            <Icon icon="chevron-right" size="small" color="inherit" />
          </Row>
        }
        onClick={(event) => {
          event.preventDefault();
          navigation.open(id, event.currentTarget);
        }}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowRight" &&
            !event.altKey &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            event.currentTarget.click();
          }
        }}
      >
        {label}
      </MenuItem>
      {open &&
        createPortal(
          <Column
            id={id}
            role="group"
            aria-label={label}
            hidden={!active}
            ref={(element) => {
              if (element) element.inert = !active;
            }}
            gap="none"
            jss={{ display: active ? "flex" : "none", minWidth: 0 }}
          >
            <MenuItem
              role="button"
              data-aidos-menu-back
              aria-label={`Back from ${label}`}
              icon="chevron-left"
              onClick={(event) => {
                event.preventDefault();
                navigation.back();
              }}
            >
              {label}
            </MenuItem>
            <MenuSeparator />
            <BaseView
              ref={mount}
              tabIndex={-1}
              jss={{ minWidth: 0, ":focus-visible": { outline: "none" } }}
            >
              {typeof children === "function"
                ? children({ back: navigation.back })
                : children}
            </BaseView>
          </Column>,
          navigation.root.current,
        )}
    </>
  );
}

export function MenuSeparator() {
  return (
    <div
      role="separator"
      style={{
        height: 1,
        margin: "4px 0",
        background: "var(--divider)",
        flexShrink: 0,
      }}
    />
  );
}
