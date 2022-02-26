import React, { useCallback } from "react";

import TextInput from "./TextInput";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
import { ReactNode, useState } from "react";

export interface TextInputWithStateProps extends BaseInputProps {
  onValueChange?: (value: string) => void;
  valueRef: React.MutableRefObject<string>;
  icon?: IconType;
  addOn?:
    | ReactNode
    | ((setValue: React.Dispatch<React.SetStateAction<string>>) => ReactNode);
  onChange?: undefined;
}

export default function TextInputWithState({
  valueRef,
  onValueChange: externalOnChange,
  icon,
  ...otherProps
}: TextInputWithStateProps) {
  const [value, setValue] = useState(valueRef.current);

  const onValueChange = useCallback(
    (value) => {
      valueRef.current = value;
      setValue(value);
      externalOnChange && externalOnChange(value);
    },
    [setValue, externalOnChange, valueRef]
  );

  let addOn =
    typeof otherProps.addOn === "function"
      ? otherProps.addOn(onValueChange)
      : otherProps.addOn;

  return (
    <TextInput
      value={value}
      onValueChange={onValueChange}
      addOn={addOn}
      icon={icon}
      {...otherProps}
    />
  );
}
