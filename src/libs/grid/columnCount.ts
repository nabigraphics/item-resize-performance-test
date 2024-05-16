import { ColumnCountWithoutAuto } from "./types";

interface CreateGridColumnCountManagerOptions {
  defaultState: ColumnCountWithoutAuto;
  responsiveWidth: number;
}

type SubscribeCallback = (newColumnCount: ColumnCountWithoutAuto) => void;

function createGridColumnCountManager(
  options: CreateGridColumnCountManagerOptions
) {
  const { defaultState: defaultColumnCount, responsiveWidth } = options;
  const subscribers = new Set<SubscribeCallback>();
  let state = defaultColumnCount;

  const setState = (newState: ColumnCountWithoutAuto) => {
    state = newState;
  };

  const init = () => {
    setState(getColumnCountByWindowInnerWidth(window.innerWidth));
  };

  const subscribe = (callback: SubscribeCallback) => {
    const matchMedia = window.matchMedia(`(min-width: ${responsiveWidth}px)`);

    const changeHandler = (e: MediaQueryListEvent) => {
      const columnCount = getColumnCountByMatches(e.matches);
      subscribers.forEach((cb) => cb(columnCount));
    };

    if (subscribers.size < 1) {
      attachMediaListener(matchMedia, changeHandler);
    }

    subscribers.add(callback);

    // Unsubscribe
    return () => {
      subscribers.delete(callback);
      if (subscribers.size < 1) {
        detachMediaListener(matchMedia, changeHandler);
      }
    };
  };

  return {
    state,
    init,
    subscribe,
    getColumnCountByWindowInnerWidth,
  };

  function getColumnCountByMatches(matches: boolean): ColumnCountWithoutAuto {
    return matches ? 3 : 2;
  }

  function getColumnCountByWindowInnerWidth(
    innerWidth: number
  ): ColumnCountWithoutAuto {
    return innerWidth > responsiveWidth ? 3 : 2;
  }
}

// https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
// 사파리 14버전(2020년 릴리즈)부터는 matchMedia에서 addEventListener를 사용할 수 있으나, 이전 버전에서는 addListener를 사용해야 하므로 try catch로 분기처리를 해주었습니다.
function attachMediaListener(
  query: MediaQueryList,
  callback: (event: MediaQueryListEvent) => void
) {
  try {
    query.addEventListener("change", callback);
  } catch (e) {
    query.addListener(callback);
  }
}

// https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
// 사파리 14버전(2020년 릴리즈)부터는 matchMedia에서 addEventListener를 사용할 수 있으나, 이전 버전에서는 addListener를 사용해야 하므로 try catch로 분기처리를 해주었습니다.
function detachMediaListener(
  query: MediaQueryList,
  callback: (event: MediaQueryListEvent) => void
) {
  try {
    query.removeEventListener("change", callback);
  } catch (e) {
    query.removeListener(callback);
  }
}

const WEB_RESPONSIVE_WIDTH = 450;
const DEFAULT_COLUMN_COUNT: ColumnCountWithoutAuto = 2;

export const gridColumnCountManager = createGridColumnCountManager({
  defaultState: DEFAULT_COLUMN_COUNT,
  responsiveWidth: WEB_RESPONSIVE_WIDTH,
});
