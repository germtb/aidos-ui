import React from "react";
import { BaseList } from "./BaseList";
import { useNavigation } from "./useNavigation";
import { cssVar } from "./jss";
export function List({ ariaLabel, jsStyle, autofocus = false, navigation = true, bare, ...otherProps }) {
    const rootRef = useNavigation({ autofocus, enabled: navigation });
    return (React.createElement(BaseList, { role: "grid", "aria-label": ariaLabel, ref: rootRef, jsStyle: [
            { overflow: "hidden" },
            !bare && {
                border: `1px solid ${cssVar("--divider")}`,
                borderRadius: cssVar("--border-radius-l"),
                background: cssVar("--overlay-background"),
            },
            jsStyle,
        ], ...otherProps }));
}
//# sourceMappingURL=List.js.map