import { useCalculatedColumnCount } from "../../libs/grid/useCalculatedColumnCount";
import { useSizeByColumnCount } from "../../libs/grid/useSizeByColumnCount";
import { Grid, GridItem } from "../../components/grid";

const items = new Array(1000).fill(0).map((_, index) => index + 1);

export const GridWindowResizePage = () => {
  const calculatedColumnCount = useCalculatedColumnCount({
    defaultColumnCount: 2,
    columnCount: "auto",
  });
  const size = useSizeByColumnCount({
    calculatedColumnCount,
    defaultSize: "small",
  });

  return (
    <div>
      <h2>Grid Window Resize Page</h2>
      <Grid columnCount={calculatedColumnCount}>
        {items.map((item) => {
          return <GridItem key={item} id={item} size={size} />;
        })}
      </Grid>
    </div>
  );
};
