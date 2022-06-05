import React, {
  useContext,
  useState,
  ReactNode,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { createEmitter, Subscribe } from "./Emitter";

type State = {
  subscribe: Subscribe<boolean>;
};

const StackContext = React.createContext<State>({
  subscribe: () => {
    return () => {};
  },
});

type Props = {
  children: ReactNode;
  isTopOfStack: boolean;
};

export function StackContextProvider({ children, isTopOfStack }: Props) {
  const emitterRef = useRef(createEmitter<boolean>());

  useEffect(() => {
    emitterRef.current.emit(isTopOfStack);
  }, [isTopOfStack]);

  const value = useMemo(
    () => ({ subscribe: emitterRef.current.subscribe }),
    []
  );

  return (
    <StackContext.Provider value={value}>{children}</StackContext.Provider>
  );
}

export function useIsTopOfStack() {
  const [isTopOfStack, setIsTopOfStack] = useState<boolean>(true);
  const { subscribe } = useContext(StackContext);

  useEffect(() => {
    return subscribe(setIsTopOfStack);
  }, [subscribe]);

  return isTopOfStack;
}
