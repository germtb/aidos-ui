import React, {
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import getCacheFromDB from "./getCacheFromDB";
import saveCacheToDB from "./saveCacheToDB";
import { LocalQuerySettings } from "./DarkModeStore";
import { createEmitter, Subscribe } from "./Emitter";

export enum QueryType {
  AllCards = "AllCards",
  AllDecks = "AllDecks",
  SearchCards = "SearchCards",
}

export enum LocalQueryType {
  Settings = "Settings",
}

export const CACHE_VERSION = "2";

export type Cache = {
  [LocalQueryType.Settings]: LocalQuerySettings;
};

type CacheRef = {
  cache: Cache;
  optimisticCache?: Cache;
};

type Selector<T> = (cache: Cache) => T;

type Reducer<T1, T2> = (acc: T1, data: T2) => T1;

type CacheReducer<Data, Input> = Reducer<Cache, { data: Data; input: Input }>;

type LocalRequest = (cacheReducer: CacheReducer<void, void>) => void;

const INITIAL_CACHE: Cache = {
  [LocalQueryType.Settings]: {
    darkModeEnabled: true,
  },
};

type GraphQLClientContextType = {
  subscribe: Subscribe<Cache>;
  localRequest: LocalRequest;
  query: <T>(selector: Selector<T>) => T;
};

const GraphQLClientContext = React.createContext<GraphQLClientContextType>({
  localRequest: (_) => {
    throw new Error("Not implemented");
  },
  subscribe: (_) => {
    throw new Error("Not implemented");
  },
  query: (_) => {
    throw new Error("Not implemented");
  },
});

type GraphQLClientProps = {
  children: ReactNode;
};

export default function GraphQLClient({ children }: GraphQLClientProps) {
  const cacheRef = useRef<CacheRef>({
    cache: INITIAL_CACHE,
  });
  const emitterRef = useRef(createEmitter<Cache>());

  const setCacheRef = useRef((cache: CacheRef) => {
    cacheRef.current = cache;
    emitterRef.current.emit(
      cacheRef.current.optimisticCache ?? cacheRef.current.cache
    );
  });

  const cacheLoadedRef = useRef(false);

  useEffect(() => {
    getCacheFromDB().then((cache) => {
      if (cache != null) {
        setCacheRef.current({ cache });
      }

      cacheLoadedRef.current = true;
    });
  }, []);

  const subscribe = useCallback((callback: (cache: Cache) => void) => {
    const unsubscribe = emitterRef.current.subscribe(callback);
    callback(cacheRef.current.optimisticCache ?? cacheRef.current.cache);

    return unsubscribe;
  }, []);

  const query = useCallback((selector) => {
    return selector(cacheRef.current.cache);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      if (cacheLoadedRef.current) {
        saveCacheToDB(cacheRef.current.cache);
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const localRequest = useCallback(
    (cacheReducer: CacheReducer<undefined, undefined>) => {
      setCacheRef.current({
        cache: cacheReducer(cacheRef.current.cache, {
          data: undefined,
          input: undefined,
        }),
        optimisticCache: cacheRef.current.optimisticCache,
      });
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      localRequest,
      subscribe,
      query,
    }),
    [localRequest, subscribe, query]
  );

  return (
    <GraphQLClientContext.Provider value={contextValue}>
      {children}
    </GraphQLClientContext.Provider>
  );
}

export function useCache<T>(
  selector: (cache: Cache) => T,
  dependencies: Array<any>,
  isEqual?: (newValue: T, oldValue: T) => boolean
): T {
  const { subscribe, query } = useContext(GraphQLClientContext);
  const [state, setState] = useState<T>(query(selector));
  const stateRef = useRef<T>(state);

  useLayoutEffect(() => {
    const unsubscribe = subscribe((cache) => {
      const newState = selector(cache);

      if (
        isEqual
          ? isEqual(newState, stateRef.current)
          : newState === stateRef.current
      ) {
        return;
      }

      stateRef.current = newState;
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, dependencies);

  return state;
}

export function useLocalMutation() {
  const { localRequest } = useContext(GraphQLClientContext);
  return localRequest;
}
