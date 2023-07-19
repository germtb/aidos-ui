import { jsx as _jsx } from "react/jsx-runtime";
import { BaseListItem } from "./BaseListItem";
import { cssVar } from "./jss";
export function ListHeaderItem({ bare, headline, body, withDivider, addOn, addOnPosition, }) {
    return (_jsx(BaseListItem, { bare: bare, headline: headline, headlineColor: "primary", headlineBold: true, body: body, addOn: addOn, addOnPosition: addOnPosition, withDivider: bare ? false : withDivider, jsStyle: bare ? null : { background: cssVar("--secondary-background") }, children: ({ content }) => content }));
}
//# sourceMappingURL=ListHeaderItem.js.map