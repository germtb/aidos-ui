import { useCallback, useId, type Ref } from "react";
import type { JSS } from "./jss";
import { useRefEffect } from "./useRefEffect";

function hasGlass(jss: JSS): boolean {
  if (!jss) return false;
  if (Array.isArray(jss)) return jss.some(hasGlass);
  const marker: unknown = "--aidos-glass" in jss && jss["--aidos-glass"];
  return marker === "1";
}

function setRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") return ref(value);
  if (ref) ref.current = value;
}

export function useGlassRef<T extends HTMLElement>(
  jss: JSS,
  ref?: Ref<T>,
): Ref<T> {
  const id = `aidos-glass-${useId()}`;
  const enabled = hasGlass(jss);
  const attach = useRefEffect(
    useCallback(
      (surface: T) => {
        const cleanup = setRef(ref, surface);
        const detach = attachGlass(surface, id);
        return () => {
          detach();
          if (typeof cleanup === "function") cleanup();
          else setRef(ref, null);
        };
      },
      [id, ref],
    ),
  );
  return enabled ? attach : ref;
}

function svgElement<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attributes: Record<string, string>,
) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attributes))
    element.setAttribute(key, value);
  return element;
}

function attachGlass(surface: HTMLElement, id: string) {
  const svg = svgElement("svg", {
    "data-aidos-glass-filter": "",
    "aria-hidden": "true",
    focusable: "false",
    width: "0",
    height: "0",
  });
  Object.assign(svg.style, { position: "absolute", pointerEvents: "none" });
  const filter = svgElement("filter", {
    id,
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    "color-interpolation-filters": "sRGB",
  });
  const image = svgElement("feImage", { result: "refraction" });
  filter.append(
    image,
    svgElement("feDisplacementMap", {
      in: "SourceGraphic",
      in2: "refraction",
      scale: "8",
      xChannelSelector: "R",
      yChannelSelector: "G",
    }),
  );
  svg.append(filter);
  document.body.append(svg);

  const opaque = matchMedia(
    "(prefers-reduced-transparency: reduce), (forced-colors: active)",
  );
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const refracts = CSS.supports("backdrop-filter", `url("#${id}")`);
  let lastSize = "";
  const update = () => {
    if (opaque.matches || !refracts) {
      surface.style.removeProperty("--aidos-glass-refraction");
      image.removeAttribute("href");
      lastSize = "";
      return;
    }
    const width = surface.offsetWidth;
    const height = surface.offsetHeight;
    if (!width || !height) return;
    const radius = parseFloat(getComputedStyle(surface).borderTopLeftRadius);
    const size = `${width}:${height}:${radius}`;
    if (size === lastSize) return;
    lastSize = size;
    const url = refractionMap(width, height, radius);
    if (!url) return;
    image.setAttribute("href", url);
    image.setAttribute("width", String(width));
    image.setAttribute("height", String(height));
    surface.style.setProperty("--aidos-glass-refraction", `url("#${id}")`);
  };
  const reset = () => surface.style.removeProperty("--aidos-glass-light-x");
  const preferences = () => {
    reset();
    update();
  };
  const reflect = (event: PointerEvent) => {
    if (
      opaque.matches ||
      reducedMotion.matches ||
      event.pointerType === "touch"
    )
      return;
    surface.style.setProperty(
      "--aidos-glass-light-x",
      `${(event.clientX / window.innerWidth) * 100}%`,
    );
  };
  const observer = new ResizeObserver(update);
  observer.observe(surface, { box: "border-box" });
  window.addEventListener("pointermove", reflect, { passive: true });
  window.addEventListener("blur", reset);
  document.documentElement.addEventListener("pointerleave", reset);
  opaque.addEventListener("change", preferences);
  reducedMotion.addEventListener("change", preferences);
  return () => {
    observer.disconnect();
    window.removeEventListener("pointermove", reflect);
    window.removeEventListener("blur", reset);
    document.documentElement.removeEventListener("pointerleave", reset);
    opaque.removeEventListener("change", preferences);
    reducedMotion.removeEventListener("change", preferences);
    surface.style.removeProperty("--aidos-glass-refraction");
    reset();
    svg.remove();
  };
}
// Refraction adapted from shuding/liquid-glass (MIT); see licenses/LiquidGlass.txt.
function refractionMap(
  width: number,
  height: number,
  cornerRadius: number,
): string | undefined {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return;
  const image = context.createImageData(width, height);
  const radius = Math.min(cornerRadius, width / 2, height / 2);
  const distance = (x: number, y: number) => {
    const qx = Math.abs(x) - width / 2 + radius;
    const qy = Math.abs(y) - height / 2 + radius;
    return (
      Math.min(Math.max(qx, qy), 0) +
      Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
      radius
    );
  };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const ix = x + 0.5 - width / 2;
      const iy = y + 0.5 - height / 2;
      const t = Math.max(0, Math.min(1, 1 + distance(ix, iy) / 14));
      const bend = t * t * (3 - 2 * t);
      const offset = (y * width + x) * 4;
      // Bend only the perimeter so wide and multiline inputs keep a flat center.
      image.data[offset] =
        (0.5 - ((distance(ix + 0.5, iy) - distance(ix - 0.5, iy)) * bend) / 2) *
        255;
      image.data[offset + 1] =
        (0.5 - ((distance(ix, iy + 0.5) - distance(ix, iy - 0.5)) * bend) / 2) *
        255;
      image.data[offset + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  return canvas.toDataURL();
}
