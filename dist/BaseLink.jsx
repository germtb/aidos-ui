import React, { useContext } from "react";
import { getInteractableJSStyles } from "./Interactable";
import { jss } from "./jss";
// This only exists to make NextJS happy, it should not be used in any other case
export const BaseLinkComponentOverrideContext = React.createContext((props) => (<a {...props}/>));
export const BaseLink = React.forwardRef(({ onClick, children, jsStyle, color, bare = false, disabled, animateInteraction = true, padding, href, role = "link", ...otherProps }, ref) => {
    const Link = useContext(BaseLinkComponentOverrideContext);
    return (<Link {...otherProps} aria-disabled={disabled ? true : undefined} href={href} role={role} ref={ref} onClick={onClick
            ? (event) => {
                if (disabled) {
                    return;
                }
                onClick(event);
            }
            : undefined} className={jss([
            ...getInteractableJSStyles({
                color,
                bare,
                disabled,
                animateInteraction,
                padding,
            }),
            disabled && { pointerEvents: "none" },
            jsStyle,
        ])}>
        {children}
      </Link>);
});
//# sourceMappingURL=BaseLink.jsx.map