import React, { ReactNode } from "react";
import ListStaticRow from "./ListStaticRow";

export default function ListStaticHeaderRow({
  label,
  secondaryAddOn,
}: {
  label: string;
  secondaryAddOn?: ReactNode;
}) {
  return (
    <ListStaticRow
      headline={label}
      headlineColor="secondary"
      background="secondary"
      secondaryAddOn={secondaryAddOn}
    />
  );
}
