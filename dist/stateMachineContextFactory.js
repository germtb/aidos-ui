import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext, useCallback, useMemo, useRef, } from "react";
import { createEmitter } from "./Emitter";
export function stateMachineContextFactory(stateMachineConfig) {
    const StateMachineContext = React.createContext({
        subscribe: () => {
            throw new Error("Not implemented");
        },
        send: (_) => {
            throw new Error("Not implemented");
        },
    });
    function Provider({ children }) {
        const stateMachineRef = useRef({
            state: stateMachineConfig.state,
            context: stateMachineConfig.context,
        });
        const emitterRef = useRef(createEmitter());
        const subscribe = useCallback((callback) => {
            const unsbuscribe = emitterRef.current.subscribe(callback);
            callback(stateMachineRef.current);
            return unsbuscribe;
        }, []);
        const send = useCallback((transition, data) => {
            const state = stateMachineRef.current.state;
            // @ts-ignore I don't know how to fix this
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
        }, []);
        const value = useMemo(() => ({ subscribe, send }), [subscribe, send]);
        return (_jsx(StateMachineContext.Provider, { value: value, children: children }));
    }
    function useStateMachine() {
        return useContext(StateMachineContext);
    }
    return { Provider, useStateMachine };
}
//# sourceMappingURL=stateMachineContextFactory.js.map