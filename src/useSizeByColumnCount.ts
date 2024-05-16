import { useEffect, useState } from "react";

import { ColumnCountWithoutAuto, ItemSize } from "./libs/grid/types";
import {
  gridSizeByColumnCountManager,
  SizeByColumnCount,
} from "./libs/grid/sizeByColumnCount";

export interface UseSizeByColumnCountOptions {
  calculatedColumnCount: ColumnCountWithoutAuto;
  defaultSize: ItemSize;
}

if (typeof window !== "undefined") {
  gridSizeByColumnCountManager.init();
}

export function useSizeByColumnCount(options: UseSizeByColumnCountOptions) {
  const { calculatedColumnCount, defaultSize } = options;

  const [size, setSize] = useState(defaultSize);

  useEffect(() => {
    const callback = (newSizeByColumnCount: SizeByColumnCount) => {
      setSize(newSizeByColumnCount[calculatedColumnCount]);
    };

    const { subscribe, getSizeByColumnCountByWindowInnerWidth } =
      gridSizeByColumnCountManager;

    const unsubscribe = subscribe(callback);

    callback(getSizeByColumnCountByWindowInnerWidth(window.innerWidth));

    return () => {
      unsubscribe();
    };
  }, [calculatedColumnCount]);

  return size;
}
