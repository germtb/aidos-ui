import React, {
  useContext,
  useCallback,
  ReactNode,
  useMemo,
  useRef,
} from "react";
import { Subscribe, createEmitter, Callback } from "./Emitter";

export type Reducer<State, Context> = <Data>({
  state,
  context,
  data,
}: {
  state: State;
  context: Context;
  data: Data;
}) => { state: State; context: Context };

type StateMachineConfig<
  State extends PropertyKey,
  Transition extends PropertyKey,
  Context,
> = {
  states: Record<
    State,
    { on: Partial<Record<Transition, Reducer<State, Context>>> }
  >;
  context: Context;
  state: State;
};

type Send<Transition> = <Data>(transition: Transition, data: Data) => void;

type StateMachineContextType<State, Transition, Context> = {
  subscribe: Subscribe<{ state: State; context: Context }>;
  send: Send<Transition>;
};

export function stateMachineContextFactory<
  State extends PropertyKey,
  Transition extends PropertyKey,
  Context,
>(
  stateMachineConfig: StateMachineConfig<State, Transition, Context>
) {
  const StateMachineContext = React.createContext<
    StateMachineContextType<State, Transition, Context>
  >({
    subscribe: () => {
      throw new Error("Not implemented");
    },
    send: () => {
      throw new Error("Not implemented");
    },
  });

  type StateMachineState = {
    state: State;
    context: Context;
  };

  function Provider({ children }: { children: ReactNode }) {
    const stateMachineRef = useRef<StateMachineState>({
      state: stateMachineConfig.state,
      context: stateMachineConfig.context,
    });

    const emitterRef = useRef(
      createEmitter<{ state: State; context: Context }>()
    );

    const subscribe = useCallback((callback: Callback<StateMachineState>) => {
      const unsbuscribe = emitterRef.current.subscribe(callback);
      callback(stateMachineRef.current);

      return unsbuscribe;
    }, []);

    const send = useCallback(
      <Data,>(transition: Transition, data: Data) => {
        const state = stateMachineRef.current.state;
        const transitions = stateMachineConfig.states[state].on;
        const reducer = transitions[transition];

        if (!reducer) {
          // No transition available in the current state, so no update needed
          return;
        }

        const newState = reducer({
          ...stateMachineRef.current,
          data,
        });

        stateMachineRef.current = newState;
        emitterRef.current.emit(newState);
      },
      []
    );

    const value = useMemo(() => ({ subscribe, send }), [subscribe, send]);

    return (
      <StateMachineContext.Provider value={value}>
        {children}
      </StateMachineContext.Provider>
    );
  }

  function useStateMachine() {
    return useContext(StateMachineContext);
  }

  return { Provider, useStateMachine };
}
