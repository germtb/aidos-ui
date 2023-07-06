import React, { ReactNode, useRef, useCallback } from "react";

import { createJSStyles } from "./Styles";
import { Column } from "./Column";
import { useIsTopOfStack } from "./StackContext";
import { queryFocusables } from "./aria";

const jsStyles = createJSStyles({
  root: {
    marginBottom: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    overflow: "auto",
    backgroundColor: "var(--secondary-background)",
    minHeight: "600px",
  },
});

export function RootView({
  children,
  focusOnlyOnFirstMount = true,
}: {
  children: ReactNode;
  focusOnlyOnFirstMount?: boolean;
}) {
  const isTopOfStack = useIsTopOfStack();
  const firstMountRef = useRef(true);
  const refCallback = useCallback(
    (element) => {
      if (!element) {
        return;
      }

      if (!isTopOfStack) {
        return;
      }

      if (focusOnlyOnFirstMount && !firstMountRef.current) {
        return;
      }

      const focusables = queryFocusables(element);
      const firstFocusable = focusables[0];
      firstMountRef.current = false;
      firstFocusable && firstFocusable.focus();
    },
    [isTopOfStack, focusOnlyOnFirstMount]
  );

  return (
    <Column ref={refCallback} jsStyle={jsStyles.root}>
      {children}
    </Column>
  );
}
