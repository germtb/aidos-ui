import { jsx as _jsx } from "react/jsx-runtime";
import { BaseView } from "./BaseView";
import { getBackground } from "./jss";
const sizes = {
    xsmall: 4,
    small: 6,
    medium: 12,
    large: 18,
    xlarge: 24,
};
export function Badge({ size = "medium", color = "highlight", jsStyle, }) {
    return (_jsx(BaseView, { jsStyle: [
            {
                width: sizes[size],
                height: sizes[size],
                borderRadius: sizes[size] / 2,
            },
            getBackground(color),
            jsStyle,
        ] }));
}
//# sourceMappingURL=Badge.js.map