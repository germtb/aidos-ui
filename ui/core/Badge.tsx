import React from "react";

import { createJSStyles } from "./Palette";
import BaseView from "./BaseView";

const jsStyles = createJSStyles({
  root: {
    width: 10,
    height: 10,
    backgroundColor: "var(--main-color)",
    borderRadius: 5,
  },
});

export default function Badge() {
  return <BaseView componentName={"Badge"} jsStyle={jsStyles.root} />;
}
