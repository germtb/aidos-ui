import React from "react";
import { ListDivider } from "./ListDivider";
import { Row } from "./Row";
import { cssVar } from "./jss";
import { TextPairing } from "./TextPairing";
import { BaseView } from "./BaseView";
import { useListContext } from "./List";
export const BaseListItem = React.forwardRef(({ children, jsStyle, withDivider = true, headline, headlineSize = "medium", headlineColor = "primary", headlineAddOn, body, bodySize = "small", bodyColor = "secondary", addOn, addOnPosition, outerAddOn, disabled = false, padding = "medium", gap = "medium", selected, headlineBold, ...otherProps }, ref) => {
    const { bare, carded } = useListContext();
    const content = (<TextPairing headlineBold={headlineBold} padding={padding} gap={gap} addOn={addOn} addOnPosition={addOnPosition} headline={headline} headlineSize={headlineSize} headlineColor={disabled ? "subtle" : bare && selected ? "highlight" : headlineColor} headlineAddOn={headlineAddOn} body={body} bodySize={bodySize} bodyColor={disabled ? "subtle" : bodyColor} grow={true} shrink={false}/>);
    return (<>
        <Row {...otherProps} ref={ref} relative tag="li" role="row" jsStyle={[
            !bare &&
                carded && {
                [":first-child *"]: {
                    borderTopLeftRadius: cssVar("--border-radius-l"),
                    borderTopRightRadius: cssVar("--border-radius-l"),
                },
                [":last-child *"]: {
                    borderBottomLeftRadius: cssVar("--border-radius-l"),
                    borderBottomRightRadius: cssVar("--border-radius-l"),
                },
            },
            jsStyle,
        ]}>
          <Row grow role="gridcell" jsStyle={{
            overflow: "hidden",
        }}>
            {children({ content })}
          </Row>
          {outerAddOn && <BaseView role="gridcell">{outerAddOn}</BaseView>}
        </Row>
        {withDivider && <ListDivider />}
      </>);
});
//# sourceMappingURL=BaseListItem.jsx.map