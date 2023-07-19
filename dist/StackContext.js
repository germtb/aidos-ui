import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext, useState, useMemo, useRef, useEffect, } from "react";
import { createEmitter } from "./Emitter";
const StackContext = React.createContext({
    subscribe: () => {
        return () => { };
    },
});
export function StackContextProvider({ children, isTopOfStack }) {
    const emitterRef = useRef(createEmitter());
    useEffect(() => {
        emitterRef.current.emit(isTopOfStack);
    }, [isTopOfStack]);
    const value = useMemo(() => ({ subscribe: emitterRef.current.subscribe }), []);
    return (_jsx(StackContext.Provider, { value: value, children: children }));
}
export function useIsTopOfStack() {
    const [isTopOfStack, setIsTopOfStack] = useState(true);
    const { subscribe } = useContext(StackContext);
    useEffect(() => {
        return subscribe(setIsTopOfStack);
    }, [subscribe]);
    return isTopOfStack;
}
//# sourceMappingURL=StackContext.js.map