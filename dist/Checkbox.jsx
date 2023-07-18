import React from "react";
import { BaseInput } from "./BaseInput";
import { jss } from "./jss";
import { StaticCheckbox } from "./StaticCheckbox";
export function Checkbox({ checked, onClick, size, ...inputProps }) {
    return (<label className={jss({
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ":has(:focus-visible)": {
                outline: "2px solid var(--outline)",
                borderRadius: "50%",
            },
            ":has(:active)": {
                transform: "scale(0.92)",
            },
        })}>
      <StaticCheckbox checked={checked} size={size}/>
      <BaseInput {...inputProps} type="checkbox" role="checkbox" aria-checked={`${checked}`} tabIndex={0} checked={checked} onChange={onClick} jsStyle={{
            position: "absolute",
            opacity: 0,
            cursor: "pointer",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
        }}/>
    </label>);
}
//# sourceMappingURL=Checkbox.jsx.map