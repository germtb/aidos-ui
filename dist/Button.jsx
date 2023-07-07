import React from "react";
import { BaseButton } from "./BaseButton";
import { Text } from "./Text";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { getGlyphColor } from "./Interactable";
import { getPadding, grow } from "./JSS";
export const Button = React.forwardRef(({ label, color, bare, disabled, icon, iconSize = "medium", iconPosition = "left", align = "center", gap = "small", justify = "center", jsStyle, size = "medium", ...otherProps }, ref) => {
    return (<BaseButton {...otherProps} bare={bare} ref={ref} color={color} disabled={disabled} jsStyle={[
            {
                borderRadius: "var(--border-radius-m)",
                justifyContent: "center",
                userSelect: "none",
            },
            getPadding("medium"),
            jsStyle,
        ]}>
        <Row jsStyle={grow} align={align} gap={gap} justify={justify}>
          {icon && iconPosition === "left" && (<Icon icon={icon} size={iconSize} color={getGlyphColor(color, disabled, bare)}/>)}
          <Text size={size} color={getGlyphColor(color, disabled, bare)}>
            {label}
          </Text>
          {icon && iconPosition === "right" && (<Icon icon={icon} size={iconSize} color={getGlyphColor(color, disabled, bare)}/>)}
        </Row>
      </BaseButton>);
});
//# sourceMappingURL=Button.jsx.map