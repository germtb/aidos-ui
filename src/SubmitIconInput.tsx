import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { createJSStyles } from "./Palette";

const jsStyles = createJSStyles({
  button: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      backgroundColor: "var(--secondary-background)",
      opacity: 0.8,
    },
    ":active": {
      transform: "scale(0.92)",
    },
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  input: {
    visibility: "hidden",
  },
});

interface SubmitIconInputProps extends BaseInputProps {
  icon: IconType;
  type?: "submit";
}

export function SubmitIconInput({ icon, ...otherProps }: SubmitIconInputProps) {
  return (
    <BaseInput
      labelContent={
        <Box jsStyle={[jsStyles.button]}>
          <Icon icon={icon} size="medium" color="primary" />
        </Box>
      }
      {...otherProps}
      type="submit"
      jsStyle={[jsStyles.input]}
      value=""
    />
  );
}
