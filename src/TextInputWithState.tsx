import React, { useCallback } from "react";

import { TextInput } from "./TextInput";
import { BaseInputProps } from "./BaseInput";
import { useState } from "react";

export interface TextInputWithStateProps extends BaseInputProps {
  onValueChange?: (value: string) => void;
  valueRef: React.MutableRefObject<string>;
  onChange?: undefined;
}

export function TextInputWithState({
  valueRef,
  onValueChange: externalOnChange,
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

  return (
    <TextInput {...otherProps} value={value} onValueChange={onValueChange} />
  );
}
