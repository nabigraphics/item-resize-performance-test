export interface CreateResizeObserverStoreOptions {
  ResizeObserver: typeof ResizeObserver;
}

type ID = string;
interface ItemRect {
  width: number;
  height: number;
}

export function createResizeObserverStore(
  options: CreateResizeObserverStoreOptions
) {
  const { ResizeObserver } = options;

  const state: Record<ID, ItemRect> = {};
  const subscribers = new Map<ID, Set<() => void>>();
  const getState = () => state;
  const ro = new ResizeObserver((entries) => {
    function callback() {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        const dataId = entry.target.attributes.getNamedItem("data-id")?.value;

        if (!dataId) {
          return;
        }

        state[dataId] = { width, height };

        const publisher = subscribers.get(dataId);

        if (publisher) {
          publisher.forEach((callback) => callback());
        }
      });
    }
    requestAnimationFrame(callback);
  });

  const subscribe = (id: string) => (callback: () => void) => {
    if (!subscribers.has(id)) {
      subscribers.set(id, new Set());
      subscribers.get(id)?.add(callback);
    } else {
      subscribers.get(id)?.add(callback);
    }

    return () => {
      subscribers.get(id)?.delete(callback);
      if (subscribers.get(id)?.size === 0) {
        subscribers.delete(id);
      }
    };
  };

  const observe = (node: Element) => {
    ro.observe(node);

    return () => {
      ro.unobserve(node);
    };
  };

  return {
    state,
    getState,
    subscribe,
    observe,
  };
}

export type ResizeObserverStore = ReturnType<typeof createResizeObserverStore>;
