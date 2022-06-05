import React from "react";
import { createClassNames, JSStyles, createJSStyles } from "./Palette";

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  jsStyle?: JSStyles;
  onValueChange: (value: string) => void;
  value: string;
  className?: undefined;
  size?: undefined;
}

const jsStyles = createJSStyles({
  root: {
    padding: "var(--spacing-m)",
    flexGrow: 1,
    backgroundColor: "var(--primary-background)",
    color: "var(--primary-text)",
    outline: "none",
    border: "none",
    fontSize: 20,
    lineHeight: 24 / 20,
    "::placeholder": {
      color: "var(--secondary-text);",
    },
  },
});

function TextArea(
  { jsStyle, onValueChange, value, onChange, ...otherProps }: TextAreaProps,
  ref?: React.Ref<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...otherProps}
      ref={ref}
      className={createClassNames(jsStyles.root, jsStyle)}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
}

export default React.forwardRef(TextArea);
