import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
import { StackContextProvider } from "./StackContext";
import { Column } from "./Column";
import { ListDivider } from "./ListDivider";
import { BaseView } from "./BaseView";
import { useRouterState } from "./NextJSRouterState";
const styles = {
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
    const { context: { navigationStack }, } = useRouterState();
    return (_jsx(BaseView, { jss: styles.root, children: navigationStack.map(({ route, routeProps }, index, list) => {
            const isTopOfStack = index === list.length - 1;
            return (_jsx(Column, { jss: [styles.route, !isTopOfStack && styles.hidden], "aria-hidden": !isTopOfStack, children: _jsxs(StackContextProvider, { isTopOfStack: isTopOfStack, children: [_jsx(ListDivider, {}), _jsx(Suspense, { fallback: null, children: _jsx(route.root, { ...routeProps }) })] }) }, route.title(routeProps)));
        }) }));
}
//# sourceMappingURL=NextJSRouter.js.map