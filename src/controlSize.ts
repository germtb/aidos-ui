import type { Size } from "./jss";

export type ControlSize = "xsmall" | "small" | "medium" | "large";

export const controlSizes: Record<
  ControlSize,
  { height: number; icon: number; padding: number; text: Size }
> = {
  xsmall: { height: 24, icon: 12, padding: 6, text: "small" },
  small: { height: 28, icon: 14, padding: 8, text: "medium" },
  medium: { height: 34, icon: 18, padding: 14, text: "medium" },
  large: { height: 40, icon: 20, padding: 16, text: "large" },
};
