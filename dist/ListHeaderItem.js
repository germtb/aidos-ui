import { jsx as _jsx } from "react/jsx-runtime";
import { BaseListItem } from "./BaseListItem";
import { cssVar } from "./jss";
export function ListHeaderItem({ bare, highlight, headline, body, withDivider, addOn, addOnPosition, }) {
    return (_jsx(BaseListItem, { bare: bare, headline: headline, headlineColor: highlight ? (bare ? "highlight" : "light") : "primary", headlineBold: true, body: body, addOn: addOn, addOnPosition: addOnPosition, withDivider: bare ? false : withDivider, jsStyle: bare
            ? null
            : {
                backgroundColor: highlight
                    ? cssVar("--highlight")
                    : cssVar("--secondary-background"),
            }, children: ({ content }) => content }));
}
//# sourceMappingURL=ListHeaderItem.js.map