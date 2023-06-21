import React from "react";
import { ListStaticRow } from "./ListStaticRow";
export function ListStaticHeaderRow({ label, body, secondaryAddOn, withDivider, }) {
    return (<ListStaticRow headline={label} headlineColor="secondary" background="secondary" secondaryAddOn={secondaryAddOn} body={body} withDivider={withDivider}/>);
}
//# sourceMappingURL=ListStaticHeaderRow.jsx.map