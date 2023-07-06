import React from "react";
import { createJSStyle } from "./Styles";
import { BaseView } from "./BaseView";

const jsStyles = createJSStyle({
  root: {
    height: "var(--spacing-xl)",
    backgroundColor: "var(--secondary-background)",
    width: "100%",
  },
});

export function ListSpacer() {
  return <BaseView jsStyle={jsStyles.root} />;
}
