import { useEffect, useState } from "react";
import { stateMachineContextFactory, } from "./stateMachineContextFactory";
import { DesignBook } from "./DesignBook";
export var RouteState;
(function (RouteState) {
    RouteState["Menu"] = "Menu";
    RouteState["DesignBook"] = "DesignBook";
    RouteState["Encounter"] = "Encounter";
})(RouteState || (RouteState = {}));
export var RouteTransition;
(function (RouteTransition) {
    RouteTransition["Pop"] = "Pop";
    RouteTransition["ToDesignBook"] = "ToDesignBook";
    RouteTransition["ToEncounter"] = "ToEncounter";
})(RouteTransition || (RouteTransition = {}));
// const MenuRoute: Route<{}, RouteState.Menu> = {
//   state: RouteState.Menu,
//   title: () => "Menu",
//   root: Menu,
// };
const DesignBookRoute = {
    state: RouteState.DesignBook,
    title: () => "DesignBook",
    root: DesignBook,
};
const INITIAL_CONTEXT = {
    navigationStack: [{ route: DesignBookRoute, routeProps: {} }],
};
const pop = ({ state, context }) => {
    if (context.navigationStack.length > 1) {
        const navigationStack = [...context.navigationStack];
        navigationStack.pop();
        const finalState = navigationStack[navigationStack.length - 1].route.state;
        return {
            state: finalState,
            context: {
                ...context,
                navigationStack,
            },
        };
    }
    return { state, context };
};
const pushFactory = (route) => ({ context, data }) => {
    return {
        state: route.state,
        context: {
            ...context,
            navigationStack: [
                ...context.navigationStack,
                {
                    route,
                    routeProps: data,
                },
            ],
        },
    };
};
const replaceFactory = (route) => ({ context, data }) => {
    return {
        state: route.state,
        context: {
            ...context,
            navigationStack: [
                ...context.navigationStack.slice(0, -1),
                {
                    route,
                    routeProps: data,
                },
            ],
        },
    };
};
const stateMachine = {
    states: {
        [RouteState.Menu]: {
            on: {
                ToDesignBook: pushFactory(DesignBookRoute),
            },
        },
        [RouteState.Encounter]: {
            on: {
                Pop: pop,
            },
        },
        [RouteState.DesignBook]: {
            on: {
                Pop: pop,
            },
        },
    },
    state: RouteState.Menu,
    context: INITIAL_CONTEXT,
};
export const { Provider, useStateMachine } = stateMachineContextFactory(stateMachine);
export const useRouterState = () => {
    const [state, setState] = useState({
        state: RouteState.Menu,
        context: INITIAL_CONTEXT,
    });
    const { subscribe } = useStateMachine();
    useEffect(() => {
        return subscribe(setState);
    }, [subscribe]);
    return state;
};
export const useRouterSend = () => {
    const { send } = useStateMachine();
    return send;
};
