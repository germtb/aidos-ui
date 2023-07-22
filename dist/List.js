import { jsx as _jsx } from "react/jsx-runtime";
import { BaseList } from "./BaseList";
import { useNavigation } from "./useNavigation";
import { cssVar } from "./jss";
export function List({ ariaLabel, jsStyle, autofocus = false, navigation = true, bare, ...otherProps }) {
    const rootRef = useNavigation({ autofocus, enabled: navigation });
    return (_jsx(BaseList, { role: "grid", "aria-label": ariaLabel, ref: rootRef, jsStyle: [
            { overflow: "hidden" },
            !bare && {
                border: `1px solid ${cssVar("--divider")}`,
                borderRadius: cssVar("--border-radius-l"),
                backgroundColor: cssVar("--overlay-background"),
            },
            jsStyle,
        ], ...otherProps }));
}
//# sourceMappingURL=List.js.map