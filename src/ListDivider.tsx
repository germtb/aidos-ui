import React from "react";
import { BaseView } from "./BaseView";

const styles = {
  root: {
    width: "100%",
    borderBottom: "1px solid var(--divider)",
  },
};

export function ListDivider() {
  return <BaseView jss={styles.root} />;
}
