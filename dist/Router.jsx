import React from "react";
import { useCallback, useEffect, useState } from "react";
import { BaseLinkComponentOverrideContext } from "./BaseLink";
export function useRouter() {
    return React.useContext(RouterContext);
}
const RouterContext = React.createContext([
    { pathname: "/" },
    () => { },
]);
const ROUTES = {
    pathname: "/",
    title: "Home",
    component: HomeRoute,
    children: [
        {
            pathname: `/session/$session_id`,
            title: "Session",
            component: HomeRoute,
            children: [],
        },
    ],
};
export function Router({ routeTree }) {
    const [route, setRoute] = useState(routeTree);
    useEffect(() => {
        let titleElement = document.querySelector("title");
        if (titleElement == null) {
            titleElement = document.createElement("title");
            document.head.appendChild(titleElement);
        }
        titleElement.innerText = route.title;
    }, [route.pathname]);
    useEffect(() => {
        history.replaceState({ pathname: new URL(window.location.href).pathname }, "", document.location.href);
        const onNavigate = (event) => {
            if (event.state != null) {
                event.preventDefault();
                setRoute(event.state);
            }
        };
        window.addEventListener("popstate", onNavigate);
        return () => {
            window.removeEventListener("popstate", onNavigate);
        };
    }, [route.pathname, setRoute]);
    const BaseLink = useCallback(({ onClick, href, ...otherProps }) => {
        return (<a {...otherProps} href={href} onClick={(event) => {
                if (event.metaKey) {
                    return;
                }
                event.preventDefault();
                if (onClick != null) {
                    onClick(event);
                }
                history.pushState({ pathname: href }, "", href);
                const targetNode = routeTree;
                const splitPath = href.split("/");
                setRoute(targetNode);
            }}/>);
    }, []);
    return (<RouterContext.Provider value={[route, setRoute]}>
      <BaseLinkComponentOverrideContext.Provider value={BaseLink}>
        <route.component />
      </BaseLinkComponentOverrideContext.Provider>
    </RouterContext.Provider>);
}
//# sourceMappingURL=Router.jsx.map