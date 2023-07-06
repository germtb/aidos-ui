import { ReactNode } from "react";
import { Subscribe } from "./Emitter";
export type Reducer<State, Context> = <Data extends any>({ state, context, data, }: {
    state: State;
    context: Context;
    data: Data;
}) => {
    state: State;
    context: Context;
};
type StateMachineConfig<State, Transition, Context> = {
    states: {
        [state: string]: {
            on: {
                [transition: Transition]: Reducer<State, Context>;
            };
        };
    };
    context: Context;
    state: State;
};
type Send = <Transition, Data>(transition: Transition, data: Data) => void;
type StateMachineContextType<State, Context> = {
    subscribe: Subscribe<{
        state: State;
        context: Context;
    }>;
    send: Send;
};
export declare function stateMachineContextFactory<State, Transition, Context>(stateMachineConfig: StateMachineConfig<State, Transition, Context>): {
    Provider: ({ children }: {
        children: ReactNode;
    }) => JSX.Element;
    useStateMachine: () => StateMachineContextType<State, Context>;
};
export {};
