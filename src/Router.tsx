import React, { Suspense } from "react";

import { StackContextProvider } from "./StackContext";
import { Column } from "./Column";
import { ListDivider } from "./ListDivider";
import { BaseView } from "./BaseView";
import { useRouterState } from "./RouterState";
import { JSStyle } from "./jss2";

const jsStyles: { [key: string]: JSStyle } = {
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 0,
    flexShrink: 1,
    flexBasis: "0%",
    position: "relative",
  },
  route: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 0,
    flexShrink: 1,
    flexBasis: "0%",
  },
  hidden: {
    display: "none",
  },
};

export function Router() {
  const {
    context: { navigationStack },
  } = useRouterState();

  return (
    <BaseView jsStyle={jsStyles.root}>
      {navigationStack.map(({ route, routeProps }, index, list) => {
        const isTopOfStack = index === list.length - 1;

        return (
          <StackContextProvider
            key={route.title(routeProps)}
            isTopOfStack={isTopOfStack}
          >
            <Column
              jsStyle={[jsStyles.route, !isTopOfStack && jsStyles.hidden]}
              aria-hidden={!isTopOfStack}
            >
              <ListDivider />
              <Suspense fallback={null}>
                <route.root {...routeProps} />
              </Suspense>
            </Column>
          </StackContextProvider>
        );
      })}
    </BaseView>
  );
}
