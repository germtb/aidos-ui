import React, { useId, useRef, useState, type ReactNode } from "react";
import { BaseInput } from "./BaseInput";
import { BaseView } from "./BaseView";
import { Column } from "./Column";
import { Icon } from "./Icon";
import type { IconType } from "./IconType";
import { Modal } from "./Dialog";
import { Row } from "./Row";
import { Text } from "./Text";

export interface SearchOption<Value extends string = string> {
  value: Value;
  label: string;
  description?: string;
  keywords?: string;
  icon?: IconType;
  trailing?: ReactNode;
  disabled?: boolean;
}

export interface SearchListProps<Value extends string = string> {
  label: string;
  options: readonly SearchOption<Value>[];
  onSelect: (value: Value) => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  filter?: boolean;
  placeholder?: string;
  loading?: boolean;
  footer?: ReactNode;
}

export function SearchList<Value extends string>({
  label,
  options,
  onSelect,
  query: controlledQuery,
  onQueryChange,
  filter = true,
  placeholder = "Search…",
  loading = false,
  footer,
}: SearchListProps<Value>) {
  const id = useId();
  const [localQuery, setQuery] = useState("");
  const query = controlledQuery ?? localQuery;
  const [selection, setSelection] = useState<{ query: string; value: Value }>(
    null,
  );
  const results = filter
    ? options.filter((option) =>
        `${option.label} ${option.description ?? ""} ${option.keywords ?? ""}`
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase()),
      )
    : options;
  const active =
    results.find(
      (option) =>
        selection?.query === query && option.value === selection.value,
    ) ?? results[0];
  const optionId = (value: Value) => `${id}-${encodeURIComponent(value)}`;
  return (
    <Column gap="none" jss={{ width: "100%", minHeight: 0 }}>
      <Row
        align="center"
        gap="medium"
        padding="large"
        jss={{
          flexShrink: 0,
          borderBottom: "2px solid var(--divider)",
          ":has(input:focus-visible)": { borderBottomColor: "var(--outline)" },
        }}
      >
        <Icon icon="search" size="small" color="secondary" />
        <BaseInput
          data-autofocus="true"
          role="combobox"
          aria-label={label}
          aria-controls={id}
          aria-expanded={true}
          aria-autocomplete="list"
          aria-activedescendant={active ? optionId(active.value) : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            if (controlledQuery === undefined) setQuery(event.target.value);
            onQueryChange?.(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing || event.keyCode === 229) return;
            if (event.key === "Enter") {
              event.preventDefault();
              if (active && !active.disabled) onSelect(active.value);
              return;
            }
            const control =
              event.ctrlKey &&
              !event.metaKey &&
              !event.altKey &&
              !event.shiftKey;
            const index = results.indexOf(active);
            const next =
              event.key === "ArrowDown" || (control && event.key === "j")
                ? index + 1
                : event.key === "ArrowUp" || (control && event.key === "k")
                  ? index - 1
                  : event.key === "Home" && event.ctrlKey
                    ? 0
                    : event.key === "End" && event.ctrlKey
                      ? results.length - 1
                      : null;
            if (next == null || !results.length) return;
            event.preventDefault();
            const option = results[(next + results.length) % results.length];
            setSelection({ query, value: option.value });
          }}
          jss={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            border: 0,
            outline: "none",
            color: "var(--primary-text)",
            fontSize: "var(--font-medium)",
            lineHeight: 20 / 14,
          }}
        />
      </Row>
      <BaseView
        role="listbox"
        aria-label={label}
        aria-busy={loading}
        id={id}
        jss={{
          minHeight: 0,
          maxHeight: "min(320px, 50dvh)",
          overflowY: "auto",
          padding: 6,
        }}
        ref={(element) => {
          const row = element?.querySelector('[aria-selected="true"]');
          if (!row) return;
          const box = row.getBoundingClientRect();
          const viewport = element.getBoundingClientRect();
          if (box.top < viewport.top)
            element.scrollTop -= viewport.top - box.top;
          else if (box.bottom > viewport.bottom)
            element.scrollTop += box.bottom - viewport.bottom;
        }}
      >
        {results.map((option) => (
          <Row
            key={option.value}
            id={optionId(option.value)}
            role="option"
            aria-selected={option === active}
            aria-disabled={option.disabled || undefined}
            align="center"
            gap="medium"
            padding="medium"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              if (!option.disabled) onSelect(option.value);
            }}
            jss={{
              minHeight: 36,
              borderRadius: 8,
              cursor: option.disabled ? "default" : "pointer",
              background:
                option === active ? "var(--light-highlight)" : "transparent",
              ":hover": { background: "var(--hovered-background)" },
              "@media (forced-colors: active)": {
                outline: option === active ? "2px solid Highlight" : "none",
                outlineOffset: -2,
              },
            }}
          >
            {option.icon && (
              <Icon icon={option.icon} size="small" color="secondary" />
            )}
            <Column grow gap="xsmall" jss={{ minWidth: 0 }}>
              <Text color={option.disabled ? "secondary" : "primary"}>
                {option.label}
              </Text>
              {option.description && (
                <Text size="small" color="secondary">
                  {option.description}
                </Text>
              )}
            </Column>
            {option.trailing && (
              <Text size="small" color="secondary" jss={{ flexShrink: 0 }}>
                {option.trailing}
              </Text>
            )}
          </Row>
        ))}
      </BaseView>
      {(loading || !results.length) && (
        <Text role="status" color="secondary" jss={{ padding: 16 }}>
          {loading ? "Loading…" : "No results"}
        </Text>
      )}
      {footer && (
        <BaseView
          jss={{
            padding: "8px 16px",
            borderTop: "1px solid var(--divider)",
            flexShrink: 0,
          }}
        >
          {footer}
        </BaseView>
      )}
    </Column>
  );
}

export interface SearchPaletteProps<
  Value extends string = string,
> extends SearchListProps<Value> {
  open: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
}

export function SearchPalette<Value extends string>({
  open,
  onClose,
  onSelect,
  onAfterClose,
  footer = (
    <Text size="small" color="secondary">
      ↑↓ Navigate · Enter Select · Esc Close
    </Text>
  ),
  ...props
}: SearchPaletteProps<Value>) {
  const pending = useRef<Value>(undefined);
  return (
    <Modal
      open={open}
      label={props.label}
      onClose={onClose}
      onAfterClose={() => {
        const value = pending.current;
        pending.current = undefined;
        if (value !== undefined) onSelect(value);
        onAfterClose?.();
      }}
      jss={{ marginTop: "10dvh", width: "min(640px, calc(100vw - 32px))" }}
    >
      <SearchList
        {...props}
        footer={footer}
        onSelect={(value) => {
          pending.current = value;
          onClose();
        }}
      />
    </Modal>
  );
}
