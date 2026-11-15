import React, { createContext, useContext, type ReactNode } from "react";
import { BaseButton, type BaseButtonProps } from "./BaseButton";
import { Column, type ColumnProps } from "./Column";
import { Icon } from "./Icon";
import type { IconType } from "./IconType";
import { Span } from "./Text";
import { useNavigation } from "./useNavigation";
import { cssVar } from "./jss";

const MenuContext = createContext<() => void>(() => {});

export interface MenuProps extends Omit<ColumnProps, "role"> {
  label: string;
  onClose?: () => void;
}

export function Menu({
  label,
  onClose = () => {},
  children,
  jss,
  ...props
}: MenuProps) {
  const navigation = useNavigation({ orientation: "vertical" });
  return (
    <MenuContext.Provider value={onClose}>
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
    <BaseButton
      {...props}
      role={role}
      aria-checked={checked}
      title={description}
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
      <Span size="small" color="inherit" jss={{ minWidth: 0, flex: 1 }}>
        {children}
      </Span>
      {trailing && (
        <Span size="small" color="secondary" jss={{ flexShrink: 0 }}>
          {trailing}
        </Span>
      )}
      {checked != null && (
        <span aria-hidden style={{ width: 14, flexShrink: 0 }}>
          {checked && <Icon icon="check" size="small" color="inherit" />}
        </span>
      )}
    </BaseButton>
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
