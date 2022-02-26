import React from "react";
import ListStaticRow from "./ListStaticRow";

export default function ListStaticHeaderRow({ label }: { label: string }) {
  return (
    <ListStaticRow
      headline={label}
      headlineColor="secondary"
      background="secondary"
    />
  );
}
