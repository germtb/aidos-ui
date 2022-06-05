import React from "react";
import BaseListRow, { BaseListRowProps } from "./BaseListRow";
import { createJSStyles, grow } from "./Palette";

const jsStyles = createJSStyles({
  root: {
    position: "relative",
    padding: "var(--spacing-m)",
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
      align="center"
      justify="center"
      componentName={(props.componentName ?? []).concat("CenteredListRow")}
      jsStyle={[props.jsStyle, jsStyles.root, grow]}
      ref={ref}
      withDivider={false}
    />
  );
}

export default React.forwardRef(CenteredListRow);
