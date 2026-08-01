import React, {
  useContext,
  useState,
  ReactNode,
  useMemo,
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
  const [emitter] = useState(() => createEmitter<boolean>());

  useEffect(() => {
    emitter.emit(isTopOfStack);
  }, [emitter, isTopOfStack]);

  const value = useMemo(
    () => ({ subscribe: emitter.subscribe }),
    [emitter],
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
