/// <reference types="react" />
export declare function useRouter(): [Route, (pathname: Route) => void];
export type Route = {
    pathname: string;
    title: string;
    component: () => JSX.Element;
    children: Array<Route>;
};
export declare function Router({ routeTree }: {
    routeTree: Route;
}): import("react/jsx-runtime").JSX.Element;
