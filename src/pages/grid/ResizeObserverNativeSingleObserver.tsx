import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useCalculatedColumnCount } from "../../useCalculatedColumnCount";
import { Grid, GridItem, GridItemProps } from "../../components/grid";
import { ItemSize } from "../../types";

const ResizeObserver = window.ResizeObserver;
const MEDIUM_SIZE_THUMBNAIL_MIN_WIDTH = 158;

interface Subs {
  node: Element;
  callback: (boxSize: { width: number; height: number }) => void;
}

function createResizeObserverSingleton() {
  if (!ResizeObserver) {
    return null;
  }

  // const subscribers = new Set<Subs>();
  const subscribers = new Map<Element, Subs["callback"]>();

  const ro = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
      const callback = subscribers.get(entry.target);
      if (callback) {
        callback({ width, height });
      }
    });
  });

  const subscribe = (subs: Subs) => {
    const { node } = subs;
    subscribers.set(node, subs.callback);
    ro.observe(node);

    return () => {
      subscribers.delete(node);
      ro.unobserve(node);
    };
  };

  return {
    subscribe,
    disconnect: () => {
      ro.disconnect();
    },
  };
}

interface ResizeObserverContextType {
  subscribe: (subs: Subs) => () => void;
  disconnect: () => void;
}

const ResizeObserverContext = createContext<
  ResizeObserverContextType | null | undefined
>(undefined);

interface ResizeObserverProviderProps {
  children: React.ReactNode;
}

function useRos() {
  const ros = useContext(ResizeObserverContext);
  if (ros === undefined) {
    throw new Error("ResizeObserverContext is not provided");
  }
  return ros;
}

interface UseRosObserveOptions {
  onResize: (boxSize: { width: number; height: number }) => void;
}

function useRosObserve(options: UseRosObserveOptions) {
  const { onResize } = options;
  const prevRef = useRef<(() => void) | null>(null);
  const ros = useRos();

  return (node: Element | null) => {
    const prev = prevRef.current;

    if (ros && node) {
      const unsubscribe = ros.subscribe({
        node,
        callback: onResize,
      });
      prevRef.current = unsubscribe;
    }
    if (!node && ros && prev) {
      prev();
    }
  };
}

const ResizeObserverProvider = (props: ResizeObserverProviderProps) => {
  const { children } = props;
  const rosRef = useRef(createResizeObserverSingleton());

  useEffect(() => {
    return () => {
      const ros = rosRef.current;
      if (ros) {
        ros.disconnect();
      }
    };
  }, []);

  return (
    <ResizeObserverContext.Provider
      value={rosRef.current}
      children={children}
    />
  );
};

const items = new Array(1000).fill(0).map((_, index) => index + 1);

export const GridResizeObserverNativeSingleObserverPage = () => {
  const columnCount = 2;

  const calculatedColumnCount = useCalculatedColumnCount({
    defaultColumnCount: columnCount,
    columnCount: "auto",
  });

  return (
    <div>
      <h2>Grid Resize Observer Page (Native + Single Observer)</h2>
      <ResizeObserverProvider>
        <Grid columnCount={calculatedColumnCount}>
          {items.map((item) => {
            return <GridItemWithResizeObserver key={item} id={item} />;
          })}
        </Grid>
      </ResizeObserverProvider>
    </div>
  );
};

const GridItemWithResizeObserver = (props: Omit<GridItemProps, "size">) => {
  const [size, setSize] = useState<ItemSize>("small");
  const observeRef = useRosObserve({
    onResize: (boxSize) => {
      if (boxSize.width >= MEDIUM_SIZE_THUMBNAIL_MIN_WIDTH) {
        setSize("medium");
      } else {
        setSize("small");
      }
    },
  });

  return (
    <GridItem ref={observeRef} data-id={props.id} size={size} {...props} />
  );
};
