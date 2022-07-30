import React from "react";
import { BaseList } from "./BaseList";
import { useNavigation } from "./useNavigation";
const PAGE_SIZE = 5;
export function List({ ariaLabel, jsStyle, autofocus = false, ...otherProps }) {
    const rootRef = useNavigation();
    return (React.createElement(BaseList, { role: "grid", "aria-label": ariaLabel, ref: rootRef, jsStyle: jsStyle, ...otherProps }));
}
