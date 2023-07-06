import React from "react";
import { createJSStyles } from "./Styles";
import { BaseView } from "./BaseView";

const jsStyles = createJSStyles({
  root: {
    width: "100%",
    borderBottom: "1px solid var(--divider)",
  },
});

export function ListDivider() {
  return <BaseView jsStyle={jsStyles.root} />;
}
