import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext, useMemo } from "react";
import { BaseList } from "./BaseList";
import { useNavigation } from "./useNavigation";
import { cssVar } from "./jss";
const ListContext = React.createContext({ bare: false });
export function List({ ariaLabel, jsStyle, autofocus = false, navigation = true, bare, carded = true, ...otherProps }) {
    const rootRef = useNavigation({ autofocus, enabled: navigation });
    const contextValue = useMemo(() => ({ bare }), [bare]);
    return (_jsx(ListContext.Provider, { value: contextValue, children: _jsx(BaseList, { role: "grid", "aria-label": ariaLabel, ref: rootRef, jsStyle: [
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
            ], ...otherProps }) }));
}
export const useListContext = () => useContext(ListContext);
//# sourceMappingURL=List.js.map