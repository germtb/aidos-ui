import React, {
  useContext,
  useCallback,
  ReactNode,
  useMemo,
  useRef,
} from "react";
import { Subscribe, createEmitter, Callback } from "./Emitter";

export type Reducer<State, Context> = <Data extends any>({
  state,
  context,
  data,
}: {
  state: State;
  context: Context;
  data: Data;
}) => { state: State; context: Context };

type StateMachineConfig<State, Transition, Context> = {
  states: {
    [state: string]: {
      // @ts-ignore
      on: { [transition: Transition]: Reducer<State, Context> };
    };
  };
  context: Context;
  state: State;
};

type Send = <Transition, Data>(transition: Transition, data: Data) => void;

type StateMachineContextType<State, Context> = {
  subscribe: Subscribe<{ state: State; context: Context }>;
  send: Send;
};

export default function stateMachineContextFactory<State, Transition, Context>(
  stateMachineConfig: StateMachineConfig<State, Transition, Context>
) {
  const StateMachineContext = React.createContext<
    StateMachineContextType<State, Context>
  >({
    subscribe: () => {
      throw new Error("Not implemented");
    },
    send: (_) => {
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
      <Transition, Data extends any>(transition: Transition, data: Data) => {
        const state = stateMachineRef.current.state;
        // @ts-ignore I don't know how to fix this
        const transitions = stateMachineConfig.states[state].on;
        const reducer: Reducer<State, Context> = transitions[transition];

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
