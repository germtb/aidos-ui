import React from "react";
import { createJSStyles } from "./Styles";
import { BaseView } from "./BaseView";

const jsStyles = createJSStyles({
  root: {
    height: "var(--spacing-xl)",
    backgroundColor: "var(--secondary-background)",
    width: "100%",
  },
});

export function ListSpacer() {
  return <BaseView jsStyle={jsStyles.root} />;
}
