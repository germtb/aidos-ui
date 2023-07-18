import React from "react";
import { BaseLink } from "./BaseLink";
import { Text } from "./Text";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { getGlyphColor } from "./Interactable";
import { cssVar } from "./jss";
export const Link = React.forwardRef(({ label, color, bare, disabled, icon, iconSize = "medium", iconPosition = "left", align = "center", gap = "small", justify = "center", jsStyle, size = "medium", ...otherProps }, ref) => {
    return (<BaseLink {...otherProps} bare={bare} ref={ref} color={color} disabled={disabled} jsStyle={[
            {
                borderRadius: "var(--border-radius-m)",
                justifyContent: "center",
                userSelect: "none",
                padding: cssVar("--spacing-m"),
                display: "inline-flex",
                textDecoration: "none",
            },
            jsStyle,
        ]}>
        <Row grow={true} align={align} gap={gap} justify={justify}>
          {icon && iconPosition === "left" && (<Icon icon={icon} size={iconSize} color={getGlyphColor(color, disabled, bare)}/>)}
          <Text size={size} color={getGlyphColor(color, disabled, bare)}>
            {label}
          </Text>
          {icon && iconPosition === "right" && (<Icon icon={icon} size={iconSize} color={getGlyphColor(color, disabled, bare)}/>)}
        </Row>
      </BaseLink>);
});
//# sourceMappingURL=Link.jsx.map