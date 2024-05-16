import clsx from "clsx";

import * as styles from "./Box.css";

export interface BoxProps {
  ratio?: number;
  className?: string;
  children?: React.ReactNode;
}

export const Box = (props: BoxProps) => {
  const { className, children, ...restProps } = props;
  return (
    <div className={clsx([styles.wrapper, className])} {...restProps}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
