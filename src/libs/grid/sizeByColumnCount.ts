import debounce from "lodash/debounce";

import { ItemSize } from "./types";

export interface SizeByColumnCount {
  2: ItemSize;
  3: ItemSize;
}

interface CreateGridSizeByColumnCountManagerOptions {
  defaultState: SizeByColumnCount;
  minWidth: number;
  margin: number;
  spacing: number;
}

type SubscribeCallback = (newSizeByColumnCount: SizeByColumnCount) => void;

function createGridSizeByColumnCountManager(
  options: CreateGridSizeByColumnCountManagerOptions
) {
  const { defaultState, minWidth, margin, spacing } = options;
  const subscribers = new Set<SubscribeCallback>();

  let state = defaultState;

  const setState = (newState: SizeByColumnCount) => {
    state = newState;
  };

  const init = () => {
    setState(getSizeByColumnCountByWindowInnerWidth(window.innerWidth));
  };

  const subscribe = (callback: SubscribeCallback) => {
    const handleResize = debounce(() => {
      const newProductCardSizeMap = getSizeByColumnCountByWindowInnerWidth(
        window.innerWidth
      );
      setState(newProductCardSizeMap);
      subscribers.forEach((cb) => cb(newProductCardSizeMap));
    }, 300);

    if (subscribers.size === 0) {
      window.addEventListener("resize", handleResize);
    }

    subscribers.add(callback);

    const unsubscribe = () => {
      subscribers.delete(callback);

      if (subscribers.size === 0) {
        window.removeEventListener("resize", handleResize);
      }
    };

    return unsubscribe;
  };

  return {
    state,
    init,
    subscribe,
    getSizeByColumnCountByWindowInnerWidth,
  };

  function getSizeByColumnCountByWindowInnerWidth(
    innerWidth: number
  ): SizeByColumnCount {
    // 2개의 column일 때, 3개의 column일 때의 아이템 사이즈(small, medium, large)를 계산합니다.
    return {
      2:
        (innerWidth - margin - margin - spacing) / 2 >= minWidth
          ? "medium"
          : "small",
      3:
        (innerWidth - margin - margin - spacing * 2) / 3 >= minWidth
          ? "medium"
          : "small",
    };
  }
}

export const DEFAULT_SIZE: ItemSize = "medium";
export const MIN_WIDTH = 158;

export const gridSizeByColumnCountManager = createGridSizeByColumnCountManager({
  defaultState: {
    2: DEFAULT_SIZE,
    3: DEFAULT_SIZE,
  },
  minWidth: MIN_WIDTH,
  margin: 0,
  spacing: 2,
});
