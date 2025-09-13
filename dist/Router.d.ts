import React from "react";
export declare function useRouter(): [Route, (pathname: Route) => void];
export type Route = {
    pathname: string;
    title: string;
    component: () => JSX.Element;
    children: Array<Route>;
};
export declare function Router({ routeTree }: {
    routeTree: Route;
}): React.JSX.Element;
