import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

import {
  CreateResizeObserverStoreOptions,
  ResizeObserverStore,
  createResizeObserverStore,
} from "./createResizeObserverStore";

export interface CreateResizeObserverContextOptions
  extends CreateResizeObserverStoreOptions {}

export function createResizeObserverContext(
  options: CreateResizeObserverContextOptions
) {
  const { ResizeObserver } = options;

  interface ResizeObserverContextType extends ResizeObserverStore {}

  interface ResizeObserverProviderProps {
    children: React.ReactNode;
  }

  const ResizeObserverContext = createContext<
    ResizeObserverContextType | null | undefined
  >(undefined);

  function useStore() {
    const context = useContext(ResizeObserverContext);
    if (context === undefined) {
      throw new Error("ResizeObserverContext is not provided");
    }
    return context;
  }

  function useItemObserve() {
    const unobserveRef = useRef<(() => void) | null>(null);
    const store = useStore();

    return (element: Element | null) => {
      const unobserve = unobserveRef.current;

      if (store && element) {
        const unsubscribe = store.observe(element);
        console.log("# onbserve node", element);
        unobserveRef.current = unsubscribe;
      }

      if (!element && store && unobserve) {
        console.log("# unobserve node", store, unobserve);
        unobserve();
      }
    };
  }

  function useSelector<T>(
    id: string,
    selector: (state: ResizeObserverStore["state"] | null) => T
  ) {
    const store = useStore();
    return useSyncExternalStore(
      useMemo(() => {
        const emptyFn = () => {
          return () => {};
        };
        return store ? store?.subscribe(id) : emptyFn;
      }, [store, id]),
      useCallback(() => {
        return selector(store?.getState() ?? null);
      }, [store, selector])
    );
  }

  const Provider = (props: ResizeObserverProviderProps) => {
    const { children } = props;

    const storeRef = useRef<ResizeObserverStore | null>(null);

    if (!storeRef.current && typeof window !== "undefined") {
      console.log("set storeRef", storeRef.current);
      storeRef.current = createResizeObserverStore({
        ResizeObserver,
      });
    }

    return (
      <ResizeObserverContext.Provider
        value={storeRef.current}
        children={children}
      />
    );
  };

  return {
    Provider,
    useStore,
    useSelector,
    useItemObserve,
  };
}
