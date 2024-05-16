import { useEffect, useState } from "react";

import { gridColumnCountManager } from "./columnCount";
import { ColumnCount, ColumnCountWithoutAuto } from "./types";

if (typeof window !== "undefined") {
  gridColumnCountManager.init();
}

export interface UseCalculatedColumnCountOptions {
  columnCount: ColumnCount;
  defaultColumnCount: ColumnCountWithoutAuto;
}

export function useCalculatedColumnCount(
  options: UseCalculatedColumnCountOptions
) {
  const { columnCount: columnCountFromOptions, defaultColumnCount } = options;

  const [columnCount, setColumnCount] = useState(defaultColumnCount);

  useEffect(() => {
    if (columnCountFromOptions !== "auto") {
      return;
    }

    const { subscribe, getColumnCountByWindowInnerWidth } =
      gridColumnCountManager;

    const callback = (columnCount: ColumnCountWithoutAuto) => {
      setColumnCount(columnCount);
    };

    const unsubscribe = subscribe(callback);

    // matchMedia의 경우 초기값을 가져오지 못하므로, innerWidth로 초기값을 설정해줍니다.
    callback(getColumnCountByWindowInnerWidth(window.innerWidth));

    return () => {
      unsubscribe();
    };
  }, [columnCountFromOptions]);

  const calculatedColumnCount =
    columnCountFromOptions === "auto" ? columnCount : columnCountFromOptions;

  return calculatedColumnCount;
}
