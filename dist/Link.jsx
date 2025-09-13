import React from "react";
import { BaseLink } from "./BaseLink";
import { Text } from "./Text";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { getGlyphColor, getCSSColor } from "./Interactable";
import { cssVar } from "./jss";
export const Link = React.forwardRef(({ children, color, bare, disabled, icon, underline, iconSize = "medium", iconPosition = "left", align = "center", gap = "small", justify = "center", jsStyle, size = "medium", padding = "medium", inline = true, bold, ...otherProps }, ref) => {
    return (<BaseLink {...otherProps} bare={bare} ref={ref} color={color} disabled={disabled} padding={padding} jsStyle={[
            {
                borderRadius: cssVar("--border-radius-m"),
                justifyContent: "center",
                userSelect: "none",
                display: inline ? "inline-flex" : "flex",
                textDecoration: "none",
            },
            underline && {
                textDecorationLine: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "2px",
                textDecorationColor: getCSSColor(color, disabled, bare),
            },
            jsStyle,
        ]}>
        <Row jsStyle={{
            display: inline ? "inline-flex" : "flex",
        }} grow={true} align={align} gap={gap} justify={justify}>
          {icon && iconPosition === "left" && (<Icon icon={icon} size={iconSize} color={getGlyphColor(color, disabled, bare)}/>)}
          <Text bold={bold} size={size} color={getGlyphColor(color, disabled, bare)}>
            {children}
          </Text>
          {icon && iconPosition === "right" && (<Icon icon={icon} size={iconSize} color={getGlyphColor(color, disabled, bare)}/>)}
        </Row>
      </BaseLink>);
});
//# sourceMappingURL=Link.jsx.map