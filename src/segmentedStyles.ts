import { cssVar, type JSS, type Padding } from "./jss";

export const segmentedPadding: Padding = ["medium", "large"];

export const segmentedGroupJSS: JSS = {
  backgroundColor: cssVar("--hovered-background"),
  borderRadius: cssVar("--border-radius-l"),
  padding: cssVar("--spacing-xs"),
  width: "fit-content",
  maxWidth: "100%",
};

export function segmentedItemJSS(selected: boolean): JSS {
  const backgroundColor = selected
    ? cssVar("--overlay-background")
    : "transparent";
  return {
    borderRadius: cssVar("--border-radius-m"),
    backgroundColor,
    boxShadow: selected ? cssVar("--shadow-sm") : "none",
    ":focus-visible": { outlineOffset: -2 },
    "[aria-disabled=true]": { backgroundColor },
    "[aria-disabled=true]:hover": { backgroundColor },
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    "@media (forced-colors: active)": {
      border: `1px solid ${selected ? "Highlight" : "transparent"}`,
      boxShadow: "none",
    },
  };
}
