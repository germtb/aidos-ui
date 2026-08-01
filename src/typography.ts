import { Size, Styles, cssVar } from "./jss";

const fontSize: Record<Size, string> = {
  xsmall: cssVar("--font-xsmall"),
  small: cssVar("--font-small"),
  medium: cssVar("--font-medium"),
  large: cssVar("--font-large"),
  xlarge: cssVar("--font-xlarge"),
  xxlarge: cssVar("--font-xxlarge"),
  xxxlarge: cssVar("--font-xxxlarge"),
};

// Leading is part of each text size rather than an ambient browser default.
// Unitless values keep custom theme font sizes proportional.
const lineHeight: Record<Size, number> = {
  xsmall: 14 / 10,
  small: 16 / 12,
  medium: 20 / 14,
  large: 24 / 18,
  xlarge: 28 / 22,
  xxlarge: 34 / 28,
  xxxlarge: 42 / 36,
};

export function getTypography(size: Size): Styles {
  return {
    fontSize: fontSize[size],
    lineHeight: lineHeight[size],
  };
}
