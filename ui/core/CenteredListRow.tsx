import React from "react";
import BaseListRow, { BaseListRowProps } from "./BaseListRow";
import { createJSStyles } from "./Palette";

const jsStyles = createJSStyles({
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    paddingLeft: "var(--spacing-m)",
    paddingRight: "var(--spacing-m)",
    justifyContent: "center",
    flexGrow: 1,
  },
});

interface CenteredListRow extends BaseListRowProps {
  withDivider?: false;
}

function CenteredListRow(
  props: CenteredListRow,
  ref?: React.Ref<HTMLLIElement>
) {
  return (
    <BaseListRow
      {...props}
      componentName={props.componentName ?? "CenteredListRow"}
      jsStyle={[props.jsStyle, jsStyles.root]}
      ref={ref}
      withDivider={false}
    />
  );
}

export default React.forwardRef(CenteredListRow);
