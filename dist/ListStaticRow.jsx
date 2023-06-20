import React from "react";
import { createJSStyles } from "./Palette";
import { TextPairing } from "./TextPairing";
import { BaseView } from "./BaseView";
import { BaseListRow } from "./BaseListRow";
import { Column } from "./Column";
const jsStyles = createJSStyles({
    root: {
        position: "relative",
        paddingTop: "var(--spacing-s)",
        paddingBottom: "var(--spacing-s)",
        paddingRight: "var(--spacing-m)",
        paddingLeft: "var(--spacing-m)",
    },
    backgroundPrimary: {
        backgroundColor: "var(--primary-background)",
    },
    backgroundSecondary: {
        backgroundColor: "var(--secondary-background)",
    },
    view: {
        display: "flex",
        flexGrow: 1,
    },
    primaryAddOn: {
        flexGrow: 0,
        flexShrink: 0,
    },
    textPairing: {
        flexBasis: "0%",
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: "center",
    },
    secondaryAddOn: {
        display: "flex",
        flexGrow: 0,
        flexShrink: 0,
        flexDirection: "column",
        justifyContent: "center",
    },
    interactiveAddOn: {
        flexGrow: 0,
        flexShrink: 0,
    },
});
export const ListStaticRow = React.forwardRef(({ headline, headlineSize = "medium", headlineColor = "primary", body, bodySize = "small", bodyColor = "secondary", primaryAddOn, secondaryAddOn, background = "primary", ...otherProps }, ref) => {
    return (<BaseListRow {...otherProps} padding={primaryAddOn ? "none" : "medium"} jsStyle={[
            jsStyles.root,
            background === "primary" && jsStyles.backgroundPrimary,
            background === "secondary" && jsStyles.backgroundSecondary,
        ]} ref={ref}>
        <BaseView jsStyle={jsStyles.view}>
          {primaryAddOn && (<BaseView jsStyle={jsStyles.primaryAddOn}>{primaryAddOn}</BaseView>)}

          <Column jsStyle={jsStyles.textPairing}>
            <TextPairing headline={headline} headlineSize={headlineSize} headlineColor={headlineColor} body={body} bodySize={bodySize} bodyColor={bodyColor}/>
          </Column>

          {secondaryAddOn && (<BaseView jsStyle={jsStyles.secondaryAddOn}>
              {secondaryAddOn}
            </BaseView>)}
        </BaseView>
      </BaseListRow>);
});
//# sourceMappingURL=ListStaticRow.jsx.map