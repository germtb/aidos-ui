import { ReactNode } from "react";
export declare function createStorage<State>({ initialState, name, }: {
    initialState: State;
    name?: string;
}): {
    Storage: ({ children }: {
        children: ReactNode;
    }) => JSX.Element;
    useStorage: <T>(selector: (state: State) => T) => T;
    useMutation: () => (mutator: (state: State) => State) => void;
    usePersist: () => () => Promise<void>;
};
