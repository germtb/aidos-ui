import React from "react";
import { BaseList } from "./BaseList";
import { useNavigation } from "./useNavigation";
export function List({ ariaLabel, jsStyle, autofocus = false, navigation = true, ...otherProps }) {
    const rootRef = useNavigation({ autofocus, enabled: navigation });
    return (React.createElement(BaseList, { role: "grid", "aria-label": ariaLabel, ref: rootRef, jsStyle: jsStyle, ...otherProps }));
}
//# sourceMappingURL=List.js.map