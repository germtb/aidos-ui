import { jsx as _jsx } from "react/jsx-runtime";
import { BaseList } from "./BaseList";
import { useNavigation } from "./useNavigation";
import { cssVar } from "./jss";
export function List({ ariaLabel, jsStyle, autofocus = false, navigation = true, bare, carded = true, ...otherProps }) {
    const rootRef = useNavigation({ autofocus, enabled: navigation });
    return (_jsx(BaseList, { role: "grid", "aria-label": ariaLabel, ref: rootRef, jsStyle: [
            { overflow: "hidden" },
            !bare && {
                backgroundColor: cssVar("--overlay-background"),
            },
            !bare &&
                !carded && {
                borderBottom: `1px solid ${cssVar("--divider")}`,
                borderTop: `1px solid ${cssVar("--divider")}`,
            },
            !bare &&
                carded && {
                border: `1px solid ${cssVar("--divider")}`,
                borderRadius: cssVar("--border-radius-l"),
            },
            jsStyle,
        ], ...otherProps }));
}
//# sourceMappingURL=List.js.map