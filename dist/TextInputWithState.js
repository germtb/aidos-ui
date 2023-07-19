import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import { TextInput } from "./TextInput";
import { useState } from "react";
export function TextInputWithState({ valueRef, onValueChange: externalOnChange, icon, ...otherProps }) {
    const [value, setValue] = useState(valueRef.current);
    const onValueChange = useCallback((value) => {
        valueRef.current = value;
        setValue(value);
        externalOnChange && externalOnChange(value);
    }, [setValue, externalOnChange, valueRef]);
    return (_jsx(TextInput, { ...otherProps, value: value, onValueChange: onValueChange }));
}
//# sourceMappingURL=TextInputWithState.js.map