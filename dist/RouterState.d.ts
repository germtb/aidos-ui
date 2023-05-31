import { ComponentType } from "react";
export declare enum RouteState {
    Menu = "Menu",
    DesignBook = "DesignBook",
    Encounter = "Encounter"
}
export declare enum RouteTransition {
    Pop = "Pop",
    ToDesignBook = "ToDesignBook",
    ToEncounter = "ToEncounter"
}
declare type Context = {
    navigationStack: Array<StackNode<any>>;
};
declare type StackNode<Props> = {
    route: Route<Props, any>;
    routeProps: Props;
};
declare type Route<Props, State extends RouteState> = {
    state: State;
    title: (props: Props) => string;
    root: ComponentType<Props>;
};
export declare const Provider: ({ children }: {
    children: import("react").ReactNode;
}) => JSX.Element, useStateMachine: () => {
    subscribe: import("./Emitter").Subscribe<{
        state: RouteState;
        context: Context;
    }>;
    send: <Transition, Data>(transition: Transition, data: Data) => void;
};
export declare const useRouterState: () => {
    state: RouteState;
    context: Context;
};
export declare const useRouterSend: () => <Transition, Data>(transition: Transition, data: Data) => void;
export {};
