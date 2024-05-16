import { forwardRef } from "react";
import { ItemSize } from "../../types";
import { Box } from "../box";

import * as styles from "./GridItem.css";

export interface GridItemProps {
  id: number;
  size: ItemSize;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  (props, ref) => {
    const { id, size } = props;
    return (
      <div ref={ref} className={styles.col} data-id={id}>
        <Box>
          <div className={styles.item}>
            Item {id} - {size}
          </div>
        </Box>
      </div>
    );
  }
);
