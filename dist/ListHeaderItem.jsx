import React from "react";
import { BaseListItem } from "./BaseListItem";
import { cssVar } from "./jss";
export function ListHeaderItem({ bare, headline, body, withDivider, addOn, addOnPosition, }) {
    return (<BaseListItem bare={bare} headline={headline} headlineColor="primary" headlineBold={true} body={body} addOn={addOn} addOnPosition={addOnPosition} withDivider={bare ? false : withDivider} jsStyle={bare ? null : { background: cssVar("--secondary-background") }}>
      {({ content }) => content}
    </BaseListItem>);
}
//# sourceMappingURL=ListHeaderItem.jsx.map