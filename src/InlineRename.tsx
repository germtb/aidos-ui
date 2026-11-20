import React, { useCallback, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Column } from "./Column";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { useRefEffect } from "./useRefEffect";
import type { JSS, Size } from "./jss";

export interface InlineRenameProps {
  anchor: HTMLElement | null;
  initialValue: string;
  label: string;
  onSave: (value: string) => void | Promise<void>;
  onClose: () => void;
  saveOnBlur?: boolean;
  maxLength?: number;
  size?: Size;
  jss?: JSS;
}

export function InlineRename({
  anchor,
  initialValue,
  label,
  onSave,
  onClose,
  saveOnBlur = true,
  maxLength = 256,
  size = "small",
  jss,
}: InlineRenameProps) {
  const input = useRef<HTMLInputElement>(null);
  const mounted = useRef(false);
  const finished = useRef(false);
  const saving = useRef(false);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const [value, setValue] = useState(initialValue);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const errorId = useId();
  const mount = useRefEffect(
    useCallback(
      (element: HTMLElement) => {
        mounted.current = true;
        const update = () => {
          if (!anchor?.isConnected || !anchor.getClientRects().length) {
            closeRef.current();
            return;
          }
          const rect = anchor.getBoundingClientRect();
          const viewport = window.visualViewport;
          const left = viewport?.offsetLeft ?? 0;
          const top = viewport?.offsetTop ?? 0;
          const width = viewport?.width ?? window.innerWidth;
          const height = viewport?.height ?? window.innerHeight;
          element.style.width = `${Math.min(rect.width, Math.max(0, width - 16))}px`;
          element.style.setProperty(
            "--aidos-rename-height",
            `${rect.height}px`,
          );
          element.style.left = `${Math.max(left + 8, Math.min(rect.left, left + width - element.offsetWidth - 8))}px`;
          element.style.top = `${Math.max(top + 8, Math.min(rect.top, top + height - element.offsetHeight - 8))}px`;
          element.style.fontFamily = getComputedStyle(anchor).fontFamily;
        };
        element.showPopover?.();
        update();
        input.current?.focus({ preventScroll: true });
        input.current?.select();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        if (anchor) observer.observe(anchor);
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        window.visualViewport?.addEventListener("resize", update);
        window.visualViewport?.addEventListener("scroll", update);
        return () => {
          mounted.current = false;
          observer.disconnect();
          window.removeEventListener("resize", update);
          window.removeEventListener("scroll", update, true);
          window.visualViewport?.removeEventListener("resize", update);
          window.visualViewport?.removeEventListener("scroll", update);
          if (element.contains(document.activeElement) && anchor?.isConnected)
            anchor.focus({ preventScroll: true });
          element.hidePopover?.();
        };
      },
      [anchor],
    ),
  );
  const close = (restoreFocus: boolean) => {
    if (finished.current) return;
    finished.current = true;
    closeRef.current();
    if (restoreFocus)
      queueMicrotask(() => {
        if (anchor?.isConnected) anchor.focus({ preventScroll: true });
      });
  };
  const save = async (restoreFocus: boolean) => {
    if (finished.current || saving.current) return;
    const name = value.trim();
    if (!name || name === initialValue) {
      close(restoreFocus);
      return;
    }
    saving.current = true;
    setPending(true);
    try {
      await onSave(name);
      if (mounted.current)
        close(restoreFocus && document.activeElement === input.current);
    } catch (error) {
      if (mounted.current) {
        setPending(false);
        setError(error instanceof Error ? error.message : String(error));
      }
    } finally {
      saving.current = false;
    }
  };
  if (!anchor || typeof document === "undefined") return null;
  return createPortal(
    <Column
      ref={mount}
      popover="manual"
      data-aidos-inline-rename
      gap="none"
      jss={[
        {
          position: "fixed",
          inset: "auto",
          margin: 0,
          padding: 0,
          border: 0,
          overflow: "visible",
          zIndex: 1000,
          background: "var(--primary-background)",
          color: "var(--primary-text)",
          borderRadius: "var(--border-radius-s)",
        },
        jss,
      ]}
    >
      <TextInput
        ref={input}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        aria-busy={pending || undefined}
        value={value}
        onValueChange={(value) => {
          setValue(value);
          setError("");
        }}
        readOnly={pending}
        maxLength={maxLength}
        size={size}
        padding={["none", "small"]}
        jssRoot={{
          height: "var(--aidos-rename-height)",
          minHeight: 0,
          boxSizing: "border-box",
          flexShrink: 0,
        }}
        jss={{ minHeight: 0, background: "var(--primary-background)" }}
        onBlur={() => {
          if (!mounted.current || error) return;
          if (saveOnBlur) void save(false);
          else if (!saving.current) close(false);
        }}
        onKeyDown={(event) => {
          event.stopPropagation();
          if (event.nativeEvent.isComposing) return;
          if (event.key === "Escape") {
            event.preventDefault();
            if (!saving.current) close(true);
          } else if (event.key === "Enter") {
            event.preventDefault();
            void save(true);
          }
        }}
      />
      {error && (
        <Text
          id={errorId}
          role="alert"
          size="small"
          color="negative"
          ellipsis={false}
          jss={{ padding: 4 }}
        >
          {error}
        </Text>
      )}
    </Column>,
    anchor.closest("dialog[open], [popover]") ?? document.body,
  );
}
