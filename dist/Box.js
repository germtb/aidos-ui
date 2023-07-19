import { jsx as _jsx } from "react/jsx-runtime";
import { FlexLayout } from "./FlexLayout";
export function Box({ padding = "medium", align = "center", justify = "center", ...otherProps }) {
    return (_jsx(FlexLayout, { padding: padding, align: align, justify: justify, ...otherProps }));
}
//# sourceMappingURL=Box.js.map