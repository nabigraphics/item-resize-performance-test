import { ResizeObserver as Polyfill } from "@juggle/resize-observer";
import { useCallback } from "react";

import { useCalculatedColumnCount } from "../../libs/grid/useCalculatedColumnCount";
import { Grid, GridItem, GridItemProps } from "../../components/grid";
import { createResizeObserverContext } from "../../libs/resize-observer/Context";

const ResizeObserver = Polyfill;
const MEDIUM_SIZE_THUMBNAIL_MIN_WIDTH = 158;

const items = new Array(1000).fill(0).map((_, index) => index + 1);

const { Provider, useItemObserve, useSelector } = createResizeObserverContext({
  ResizeObserver,
});

export const GridResizeObserverPolyfillPage = () => {
  const columnCount = 2;

  const calculatedColumnCount = useCalculatedColumnCount({
    defaultColumnCount: columnCount,
    columnCount: "auto",
  });

  return (
    <div>
      <h2>Grid Resize Observer Page (Polyfill + Single Observer)</h2>
      <Provider>
        <Grid className="resize-mode" columnCount={calculatedColumnCount}>
          {items.map((item) => {
            return <GridItemWithResizeObserver key={item} id={item} />;
          })}
        </Grid>
      </Provider>
    </div>
  );
};

const GridItemWithResizeObserver = (props: Omit<GridItemProps, "size">) => {
  const observeRef = useItemObserve();
  const size = useSelector(
    `${props.id}`,
    useCallback((state) => {
      const { width } = state?.[`${props.id}`] ?? {
        width: 0,
        height: 0,
      };

      return width >= MEDIUM_SIZE_THUMBNAIL_MIN_WIDTH ? "medium" : "small";
    }, [])
  );

  return <GridItem ref={observeRef} size={size} {...props} />;
};
