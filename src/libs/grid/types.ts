export type ItemSize = "small" | "medium" | "large";
export type ColumnCount = 2 | 3 | "auto";
export type ColumnCountWithoutAuto = Exclude<ColumnCount, "auto">;
