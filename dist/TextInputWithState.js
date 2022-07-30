import React, { useCallback } from "react";
import { TextInput } from "./TextInput";
import { useState } from "react";
export function TextInputWithState({ valueRef, onValueChange: externalOnChange, icon, addOn, ...otherProps }) {
    const [value, setValue] = useState(valueRef.current);
    const onValueChange = useCallback((value) => {
        valueRef.current = value;
        setValue(value);
        externalOnChange && externalOnChange(value);
    }, [setValue, externalOnChange, valueRef]);
    const addOnComponent = typeof addOn === "function" ? addOn(onValueChange) : addOn;
    return (React.createElement(TextInput, { ...otherProps, value: value, onValueChange: onValueChange, icon: icon, addOn: addOnComponent }));
}
