import React, { type ReactNode } from "react";
import { IconButton } from "./IconButton";
import { InputFrame } from "./InputFrame";
import { Row } from "./Row";
import { TextArea, type TextAreaProps } from "./TextArea";
import { cssVar, type JSS } from "./jss";

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
    jssRoot,
    jss,
    onKeyDown,
    disabled,
    readOnly,
    ...props
  }: ComposerProps,
  ref?: React.Ref<HTMLTextAreaElement>,
) {
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
          flexDirection: "column",
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
        embedded && {
          background: "transparent",
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
            width: "100%",
            minHeight: 44,
            resize: "none",
            border: "none",
            borderRadius: "inherit",
            background: "transparent",
            padding: "14px 16px 10px",
            outline: "none",
            ":focus-visible": { outline: "none" },
          },
          jss,
        ]}
      />
      <Row
        align="center"
        gap="small"
        jss={{ minWidth: 0, padding: "0 10px 10px" }}
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
