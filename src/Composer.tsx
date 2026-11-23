import React, { type ReactNode } from "react";
import { glass, type GlassThickness } from "./glass";
import { IconButton } from "./IconButton";
import { InputFrame } from "./InputFrame";
import { Row } from "./Row";
import { TextArea, type TextAreaProps } from "./TextArea";
import { cssVar, type JSS } from "./jss";

const glassFrameStyles = {
  borderRadius: 24,
  "--composer-outline":
    "color-mix(in srgb, var(--primary-text) 3%, transparent)",
} as const;

export interface ComposerProps extends Omit<
  TextAreaProps,
  "onSubmit" | "children"
> {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  footer?: ReactNode;
  action?: ReactNode;
  submitDisabled?: boolean;
  submitLabel?: string;
  embedded?: boolean;
  material?: "glass";
  glassThickness?: GlassThickness;
  jssRoot?: JSS;
}

export const Composer = React.forwardRef(function Composer(
  {
    value,
    onValueChange,
    onSubmit,
    footer,
    action,
    submitDisabled = false,
    submitLabel = "Send message",
    embedded = false,
    material,
    glassThickness = "thin",
    jssRoot,
    jss,
    onKeyDown,
    disabled,
    readOnly,
    ...props
  }: ComposerProps,
  ref?: React.Ref<HTMLTextAreaElement>,
) {
  const isGlass = material === "glass" && !embedded;
  const canSubmit =
    !disabled && !readOnly && !submitDisabled && Boolean(value.trim());
  const submit = () => {
    if (canSubmit) onSubmit();
  };
  return (
    <InputFrame
      data-aidos-composer
      jss={[
        {
          flexDirection: embedded ? "column" : "row",
          alignItems: embedded ? "stretch" : "flex-end",
          width: "100%",
          minWidth: 0,
          borderRadius: 20,
          overflow: "visible",
          boxShadow: cssVar("--shadow-sm"),
          ":hover": {
            borderColor:
              "color-mix(in srgb, var(--composer-outline, var(--strong-divider)) 60%, var(--divider))",
          },
          ":has(:is(input, textarea, select):focus-visible)": {
            borderColor: "var(--composer-outline, var(--strong-divider))",
            outline: "none",
          },
          ":has(:is(input, textarea, select)[aria-invalid=true]:focus-visible)":
            {
              borderColor: cssVar("--negative-text"),
              outline: "none",
            },
        },
        isGlass && glass(glassThickness),
        isGlass && glassFrameStyles,
        embedded && {
          backgroundColor: "transparent",
          borderColor: "transparent",
          boxShadow: "none",
          borderRadius: cssVar("--border-radius-m"),
        },
        jssRoot,
      ]}
    >
      <TextArea
        {...props}
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        autoGrow
        disabled={disabled}
        readOnly={readOnly}
        aria-label={props["aria-label"] ?? "Message"}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            event.defaultPrevented ||
            event.nativeEvent.isComposing ||
            event.keyCode === 229 ||
            event.repeat
          )
            return;
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.altKey &&
            !event.ctrlKey &&
            !event.metaKey
          ) {
            event.preventDefault();
            submit();
          }
        }}
        jss={[
          {
            width: embedded ? "100%" : 0,
            flex: "1 1 auto",
            minHeight: 44,
            resize: "none",
            border: "none",
            borderRadius: "inherit",
            backgroundColor: "transparent",
            padding: embedded ? "14px 16px 10px" : "12px 16px",
            outline: "none",
            ":focus-visible": { outline: "none" },
          },
          jss,
        ]}
      />
      <Row
        align="center"
        gap="small"
        jss={{
          minWidth: 0,
          flexShrink: 0,
          maxWidth: embedded ? undefined : "50%",
          padding: embedded ? "0 10px 10px" : "8px 10px 8px 0",
        }}
      >
        <Row
          align="center"
          gap="xsmall"
          grow
          jss={{ minWidth: 0, flexWrap: "wrap" }}
        >
          {footer}
        </Row>
        {action ?? (
          <IconButton
            bare
            icon="arrow-up"
            color="primary"
            size="small"
            aria-label={submitLabel}
            disabled={!canSubmit}
            onClick={submit}
          />
        )}
      </Row>
    </InputFrame>
  );
});
