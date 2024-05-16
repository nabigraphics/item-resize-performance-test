import { style } from "@vanilla-extract/css";

export const wrapper = style({
  width: "100%",
  position: "relative",
  paddingBottom: "100%",
  boxSizing: "border-box",
  backgroundColor: "#f1f5f9",
});

export const inner = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});
