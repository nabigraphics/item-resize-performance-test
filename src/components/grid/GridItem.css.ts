import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  gap: 8,
});

export const col = style({
  padding: 0,
  margin: 0,
  boxSizing: "border-box",
  width: "100%",
  selectors: {
    // 100% / {gap} * {여백 갯수} / {컬럼 갯수}
    [`.column-count-2 &`]: {
      maxWidth: `calc(100% / 2 - (8px * 1 / 2))`,
    },
    [`.column-count-3 &`]: {
      maxWidth: `calc(100% / 3 - (8px * 2 / 3))`,
    },
    [`.resize-mode &`]: {
      resize: "both",
      overflow: "scroll",
    },
  },
});

export const item = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
