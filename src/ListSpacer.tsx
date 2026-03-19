import React from "react";
import { BaseView } from "./BaseView";

const styles = {
  root: {
    height: "var(--spacing-xl)",
    backgroundColor: "var(--secondary-background)",
    width: "100%",
  },
};

export function ListSpacer() {
  return <BaseView jss={styles.root} />;
}
