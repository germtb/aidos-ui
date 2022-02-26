import React, { ReactNode, useMemo } from "react";
import ReactDOM from "react-dom";

import RouterState from "./RouterState";
import { useIsTopOfStack } from "./StackContext";
import { createJSStyles } from "./Palette";
import Row from "./Row";
import BaseView from "./BaseView";
import Button from "./Button";

const badgeRoot = document.createElement("div");

const jsStyles = createJSStyles({
  root: {
    flexGrow: 0,
    paddingTop: "var(--spacing-m)",
    paddingBottom: "var(--spacing-m)",
    lineHeight: "20px",
    height: "var(--nav-bar-height)",
    backgroundColor: "var(--nav-bar)",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: -8, // To compensate bad icon
  },
  badge: {},
  backButton: {},
});

function NavBar() {
  const {
    context: { navigationStack },
  } = RouterState.useRouterState();
  const send = RouterState.useRouterSend();
  const currentStackNode = navigationStack[navigationStack.length - 1];
  const previousStackNode = navigationStack[navigationStack.length - 2];
  const previousTitleFactory = previousStackNode?.route?.title;
  const previousTitle = previousTitleFactory
    ? previousTitleFactory(currentStackNode?.routeProps)
    : undefined;

  const backButtonElement = useMemo(() => {
    return previousTitle ? (
      <BaseView jsStyle={jsStyles.backButton}>
        <Button
          label={previousTitle}
          icon="chevron-left"
          iconSize="large"
          onPress={() => send(RouterState.RouteTransition.Pop, {})}
          aria-label={`Pop back to: ${previousTitle && previousTitle}`}
          color="positive"
          bare={true}
        />
      </BaseView>
    ) : null;
  }, [previousTitle, send]);

  return navigationStack.length > 1 ? (
    <Row jsStyle={jsStyles.root}>
      {backButtonElement}
      <BaseView
        jsStyle={jsStyles.badge}
        ref={(e) => {
          if (e) {
            e.appendChild(badgeRoot);
          }
        }}
      />
    </Row>
  ) : null;
}

type BadgeProps = {
  children: ReactNode;
};

export function NavBadge({ children }: BadgeProps) {
  const isTopOfStack = useIsTopOfStack();

  if (!isTopOfStack) {
    return null;
  }

  return ReactDOM.createPortal(children, badgeRoot);
}

export default React.memo(NavBar);
