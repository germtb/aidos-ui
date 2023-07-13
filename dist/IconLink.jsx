import React from "react";
import { Icon } from "./Icon";
import { getGlyphColor } from "./Interactable";
import { BaseLink } from "./BaseLink";
const sizes = {
    xsmall: 20,
    small: 24,
    medium: 32,
    large: 40,
    xlarge: 48,
};
export const IconLink = React.forwardRef(({ icon, size, color, bare, disabled, ...buttonProps }, ref) => {
    return (<BaseLink {...buttonProps} bare={bare} jsStyle={[
            {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: sizes[size],
                width: sizes[size],
                borderRadius: sizes[size] / 2,
                textDecoration: "none",
            },
            !disabled && {
                ":active": {
                    transform: "scale(0.92)",
                },
            },
        ]} color={color} ref={ref} disabled={disabled}>
        <Icon size={size} icon={icon} color={getGlyphColor(color, disabled, bare)}/>
      </BaseLink>);
});
//# sourceMappingURL=IconLink.jsx.map