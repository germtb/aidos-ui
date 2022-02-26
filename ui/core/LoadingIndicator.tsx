import React from "react";
import BaseView from "./BaseView";
import { createJSStyles } from "./Palette";

type LoadingIndicatorProps = {};

const jsStyles = createJSStyles({
  root: {
    // height: 32,
    // width: 32,
    // borderRadius: 16,
    backgroundColor: "var(--highlight)",
    transition: "1s background-color ease-in",
  },
});

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  return <BaseView jsStyle={jsStyles.root}>Loading...</BaseView>;
}
