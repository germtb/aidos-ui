import React, { ReactNode } from "react";
import { createJSStyles } from "./Palette";
import BaseInput, { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
import Icon from "./Icon";
import Row from "./Row";
import Box from "./Box";

export interface TextInputProps extends BaseInputProps {
  onValueChange: (value: string) => void;
  icon?: IconType;
  addOn?: ReactNode;
  onChange?: undefined;
}

const jsStyles = createJSStyles({
  root: {
    backgroundColor: "var(--primary-background)",
  },
  input: {
    padding: "var(--spacing-m)",
    flexGrow: 1,
    backgroundColor: "var(--primary-background)",
    color: "var(--primary-text)",
    outline: "none",
    border: "none",
    fontSize: 20,
    lineHeight: 24 / 20,
    "::placeholder": {
      color: "var(--subtle-text);",
    },
    ":disabled": {
      color: "var(--subtle-text);",
    },
  },
});

function TextInput(
  { value, onValueChange, jsStyle, icon, addOn, ...inputProps }: TextInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <Row jsStyle={jsStyles.root}>
      {icon && (
        <Box spacing="medium">
          <Icon size="medium" color="secondary" icon={icon} />
        </Box>
      )}
      <BaseInput
        {...inputProps}
        ref={ref}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        jsStyle={[jsStyles.input, jsStyle]}
      />
      {addOn}
    </Row>
  );
}

export default React.forwardRef(TextInput);
