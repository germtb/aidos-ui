import type { Styles } from "./jss";

export type GlassThickness = "thin" | "regular" | "thick";

const thicknessStyles = {
  thin: {
    backgroundColor: "var(--aidos-glass-background, var(--aidos-glass-tint))",
    "--aidos-glass-tint":
      "light-dark(rgb(255 255 255 / 28%), rgb(28 30 35 / 32%))",
    "--aidos-glass-hovered":
      "light-dark(rgb(255 255 255 / 38%), rgb(28 30 35 / 42%))",
    "--aidos-glass-pressed":
      "light-dark(rgb(255 255 255 / 48%), rgb(28 30 35 / 52%))",
    "--aidos-glass-blur": "5px",
  },
  regular: {
    backgroundColor: "var(--aidos-glass-background, var(--aidos-glass-tint))",
    "--aidos-glass-tint":
      "light-dark(rgb(255 255 255 / 38%), rgb(28 30 35 / 42%))",
    "--aidos-glass-hovered":
      "light-dark(rgb(255 255 255 / 46%), rgb(28 30 35 / 50%))",
    "--aidos-glass-pressed":
      "light-dark(rgb(255 255 255 / 54%), rgb(28 30 35 / 58%))",
    "--aidos-glass-blur": "8px",
  },
  thick: {
    backgroundColor: "var(--aidos-glass-background, var(--aidos-glass-tint))",
    "--aidos-glass-tint":
      "light-dark(rgb(255 255 255 / 48%), rgb(28 30 35 / 52%))",
    "--aidos-glass-hovered":
      "light-dark(rgb(255 255 255 / 56%), rgb(28 30 35 / 60%))",
    "--aidos-glass-pressed":
      "light-dark(rgb(255 255 255 / 64%), rgb(28 30 35 / 68%))",
    "--aidos-glass-blur": "12px",
  },
} as const;

const glassStyles = {
  "--aidos-glass": "1",
  position: "relative",
  boxShadow:
    "0 4px 16px rgb(0 0 0 / 16%), inset 0 1px 0 rgb(255 255 255 / 4%), inset 0 -8px 20px rgb(0 0 0 / 6%)",
  "--aidos-glass-selected":
    "color-mix(in srgb, var(--highlight) 14%, var(--aidos-glass-background, var(--aidos-glass-tint)))",
  backgroundImage:
    "radial-gradient(ellipse at var(--aidos-glass-light-x, 50%) -40%, rgb(255 255 255 / 3%), transparent 70%)",
  backdropFilter:
    "var(--aidos-glass-refraction, blur(0px)) blur(var(--aidos-glass-blur)) saturate(1.1)",
  WebkitBackdropFilter: "blur(var(--aidos-glass-blur)) saturate(1.1)",
  borderColor: "transparent",
  ":hover": { borderColor: "transparent" },
  ":is(button, a):not([aria-disabled=true])": {
    color: "var(--primary-text)",
    textDecorationColor: "currentColor",
  },
  ":is(button, a):hover:not([aria-disabled=true])": {
    backgroundColor: "var(--aidos-hover-background)",
    borderColor: "transparent",
    filter: "none",
  },
  ":is(button, a):active:hover:not([aria-disabled=true])": {
    backgroundColor: "var(--aidos-pressed-background)",
  },
  "--aidos-glass-refraction": "blur(0px)",
  "--aidos-hover-background":
    "var(--aidos-glass-background, var(--aidos-glass-hovered))",
  "--aidos-pressed-background":
    "var(--aidos-glass-background, var(--aidos-glass-pressed))",
  ":is([aria-selected=true], [aria-current=page], [aria-pressed=true], [data-aidos-selected=true])":
    {
      backgroundColor: "var(--aidos-glass-selected)",
      "--aidos-hover-background": "var(--aidos-glass-selected)",
      "--aidos-pressed-background": "var(--aidos-glass-selected)",
    },
  "--aidos-glass-edge":
    "inset 0 0 0 0.5px light-dark(rgb(255 255 255 / 80%), rgb(140 160 180 / 11%)), inset 0 0 0 1px light-dark(rgb(255 255 255 / 50%), rgb(140 160 180 / 14%))",
  "--aidos-glass-reflection":
    "radial-gradient(ellipse at var(--aidos-glass-light-x, 50%) 0%, rgb(255 255 255 / 8%), transparent 65%)",
  "::before": {
    content: '""',
    position: "absolute",
    inset: -1,
    borderRadius: "inherit",
    boxShadow: "var(--aidos-glass-edge)",
    pointerEvents: "none",
  },
  "::after": {
    content: '""',
    position: "absolute",
    inset: -1,
    borderRadius: "inherit",
    padding: 1,
    background: "var(--aidos-glass-reflection)",
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
  "@media (prefers-reduced-transparency: reduce), (forced-colors: active)": {
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
    backgroundImage: "none",
    "--aidos-glass-background": "var(--overlay-background)",
    borderColor: "var(--divider)",
    "--aidos-glass-edge": "none",
    "--aidos-glass-reflection": "none",
  },
} as const;

export function glass(thickness: GlassThickness = "thin"): Styles {
  return { ...glassStyles, ...thicknessStyles[thickness] };
}
