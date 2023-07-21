import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { IconType } from "./IconType";

interface SubmitIconInputProps extends BaseInputProps {
  icon: IconType;
  type?: "submit";
}

export function SubmitIconInput({ icon, ...otherProps }: SubmitIconInputProps) {
  return (
    <BaseInput
      label={
        <Box
          jsStyle={{
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
          }}
        >
          <Icon icon={icon} size="medium" color="primary" />
        </Box>
      }
      {...otherProps}
      type="submit"
      jsStyle={{
        visibility: "hidden",
      }}
      value=""
    />
  );
}
