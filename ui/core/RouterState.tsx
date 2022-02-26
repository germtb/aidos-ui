import { useEffect, useState, ComponentType } from "react";

import stateMachineContextFactory, {
  Reducer,
} from "./stateMachineContextFactory";

import Menu from "./Menu";
import DesignBook from "./DesignBook";
import Encounter from "./Encounter";

enum RouteState {
  Menu = "Menu",
  DesignBook = "DesignBook",
  Encounter = "Encounter",
}

enum RouteTransition {
  Pop = "Pop",
  ToDesignBook = "ToDesignBook",
  ToEncounter = "ToEncounter",
}

type Context = {
  navigationStack: Array<StackNode<any>>;
};

type StackNode<Props> = {
  route: Route<Props, any>;
  routeProps: Props;
};

type Route<Props, State extends RouteState> = {
  state: State;
  title: (props: Props) => string;
  root: ComponentType<Props>;
};

const MenuRoute: Route<{}, RouteState.Menu> = {
  state: RouteState.Menu,
  title: () => "Menu",
  root: Menu,
};

const DesignBookRoute: Route<{}, RouteState.DesignBook> = {
  state: RouteState.DesignBook,
  title: () => "DesignBook",
  root: DesignBook,
};

const INITIAL_CONTEXT: Context = {
  navigationStack: [{ route: MenuRoute, routeProps: {} }],
};

const pop: Reducer<RouteState, Context> = ({ state, context }) => {
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

const pushFactory = <Props, State extends RouteState>(
  route: Route<Props, State>
): Reducer<RouteState, Context> => ({ context, data }) => {
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

const replaceFactory = <Props, State extends RouteState>(
  route: Route<Props, State>
): Reducer<RouteState, Context> => ({ context, data }) => {
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

const { Provider, useStateMachine } = stateMachineContextFactory(stateMachine);

const useRouterState = () => {
  const [state, setState] = useState<{ state: RouteState; context: Context }>({
    state: RouteState.Menu,
    context: INITIAL_CONTEXT,
  });
  const { subscribe } = useStateMachine();

  useEffect(() => {
    return subscribe(setState);
  }, [subscribe]);

  return state;
};

const useRouterSend = () => {
  const { send } = useStateMachine();

  return send;
};

export default {
  Provider,
  useRouterState,
  useRouterSend,
  RouteState,
  RouteTransition,
};
