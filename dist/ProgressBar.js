import { jsx as _jsx } from "react/jsx-runtime";
import { BaseView } from "./BaseView";
import { getBackground } from "./jss";
const jsss = {
  root: {
    width: "100%",
    display: "flex",
    position: "relative",
    backgroundColor: "var(--primary-background)",
    borderRadius: "var(--border-radius-s)",
    border: "1px solid var(--divider)",
    overflow: "hidden",
  },
  fill: {
    borderRadius: "var(--border-radius-s)",
    position: "absolute",
    transformOrigin: "center left",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};
const sizes = {
  xsmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
};
export function ProgressBar({ color, progress, size, jss }) {
  return _jsx(BaseView, {
    jss: [
      jsss.root,
      {
        height: sizes[size],
      },
      jss,
    ],
    children: _jsx(BaseView, {
      jss: [jsss.fill, getBackground(color)],
      style: {
        transform: `scaleX(${progress > 1 ? 1 : progress})`,
      },
    }),
  });
}
//# sourceMappingURL=ProgressBar.js.map
