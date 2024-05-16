import clsx from "clsx";

import { ColumnCount } from "../../types";
import * as styles from "./GridItem.css";

export interface GridProps {
  columnCount: ColumnCount;
  children?: React.ReactNode;
}

export const Grid = (props: GridProps) => {
  const { columnCount, children } = props;
  return (
    <div className={clsx([styles.wrapper, `column-count-${columnCount}`])}>
      {children}
    </div>
  );
};
