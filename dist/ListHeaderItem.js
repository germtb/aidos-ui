import { jsx as _jsx } from "react/jsx-runtime";
import { BaseListItem } from "./BaseListItem";
import { cssVar } from "./jss";
import { useListContext } from "./List";
export function ListHeaderItem({ highlight, headline, body, withDivider, addOn, addOnPosition, }) {
    const { bare } = useListContext();
    return (_jsx(BaseListItem, { headline: headline, headlineColor: highlight ? (bare ? "highlight" : "light") : "primary", headlineBold: true, body: body, addOn: addOn, addOnPosition: addOnPosition, withDivider: bare ? false : withDivider, jsStyle: bare
            ? null
            : {
                backgroundColor: highlight
                    ? cssVar("--highlight")
                    : cssVar("--secondary-background"),
            }, children: ({ content }) => content }));
}
//# sourceMappingURL=ListHeaderItem.js.map