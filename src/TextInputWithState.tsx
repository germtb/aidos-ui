import React, { useCallback } from "react";

import { TextInput } from "./TextInput";
import { BaseInputProps } from "./BaseInput";
import { useState } from "react";

function getInitialValue(valueRef: React.MutableRefObject<string>) {
  return valueRef.current;
}

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
  const [value, setValue] = useState(() => getInitialValue(valueRef));

  const onValueChange = useCallback(
    (value) => {
      valueRef.current = value;
      setValue(value);
      externalOnChange?.(value);
    },
    [externalOnChange, valueRef],
  );

  return (
    <TextInput {...otherProps} value={value} onValueChange={onValueChange} />
  );
}
