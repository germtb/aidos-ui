import React from "react";
import {
  JSS,
  Padding,
  Size,
  cssVar,
  getPadding,
  getSpacing,
  toClassnames,
} from "./jss";
import { getTypography } from "./typography";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  jss?: JSS;
  onValueChange?: (value: string) => void;
  value?: string;
  className?: undefined;
  size?: Size;
  padding?: Padding;
  autoGrow?: boolean;
  onChange?: undefined;
}

export const TextArea = React.forwardRef(function TextArea(
  {
    jss,
    onValueChange,
    value,
    padding = "medium",
    size = "medium",
    autoGrow = false,
    rows = autoGrow ? 1 : 3,
    ...otherProps
  }: TextAreaProps,
  ref?: React.Ref<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...otherProps}
      ref={ref}
      rows={rows}
      className={toClassnames([
        {
          display: "block",
          minWidth: 0,
          flexGrow: 1,
          color: cssVar("--primary-text"),
          ...getTypography(size),
          backgroundColor: cssVar("--overlay-background"),
          border: `1px solid ${cssVar("--divider")}`,
          borderRadius: cssVar("--border-radius-m"),
          "::placeholder": { color: cssVar("--subtle-text") },
          ":focus-visible": {
            outline: `2px solid ${cssVar("--outline")}`,
            outlineOffset: -2,
          },
          "[aria-invalid=true]": { borderColor: cssVar("--negative-text") },
          "[aria-invalid=true]:focus-visible": {
            outlineColor: cssVar("--negative-text"),
          },
          ":disabled": {
            color: cssVar("--subtle-text"),
            backgroundColor: cssVar("--secondary-background"),
            cursor: "not-allowed",
          },
        },
        autoGrow && {
          fieldSizing: "content",
          minHeight: `calc(${rows}lh + 2 * ${getSpacing(Array.isArray(padding) ? padding[0] : padding)} + 2px)`,
          maxHeight: 180,
          overflowY: "auto",
        },
        getPadding(padding),
        jss,
      ])}
      value={value}
      onChange={
        onValueChange ? (event) => onValueChange(event.target.value) : undefined
      }
    />
  );
});
