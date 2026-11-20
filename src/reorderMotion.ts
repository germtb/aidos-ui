import { flushSync } from "react-dom";

const transition = { duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)" };
const settling = new WeakMap<HTMLElement, () => void>();
const motions = new WeakMap<HTMLElement, Map<HTMLElement, Animation>>();

type Point = { x: number; y: number };

export function reorderItems(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>("[data-aidos-reorder-item]"),
  ).filter(
    (item) =>
      item.closest("[data-aidos-reorder-root]") === root &&
      !item.closest("[data-aidos-reorder-ghost]"),
  );
}

export function reorderBounds(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const [x, y] = getComputedStyle(element).translate.split(" ").map(parseFloat);
  // Collision detection follows layout, not the animated path between positions.
  return new DOMRect(
    rect.left - (x || 0) * (rect.width / element.offsetWidth || 1),
    rect.top - (y || 0) * (rect.height / element.offsetHeight || 1),
    rect.width,
    rect.height,
  );
}

function createReorderGhost(
  root: HTMLElement,
  source: HTMLElement,
  box = source.getBoundingClientRect(),
) {
  const style = getComputedStyle(source);
  const ghost = source.cloneNode(true) as HTMLElement;
  ghost.removeAttribute("data-aidos-reorder-item");
  ghost.removeAttribute("id");
  ghost
    .querySelectorAll("[id]")
    .forEach((element) => element.removeAttribute("id"));
  ghost.setAttribute("aria-hidden", "true");
  ghost.setAttribute("popover", "manual");
  ghost.dataset.aidosReorderGhost = "";
  ghost.inert = true;
  Object.assign(ghost.style, {
    position: "fixed",
    inset: "auto",
    margin: 0,
    left: `${box.left}px`,
    top: `${box.top}px`,
    width: `${box.width}px`,
    height: `${box.height}px`,
    boxSizing: "border-box",
    border: 0,
    padding: style.padding,
    color: style.color,
    pointerEvents: "none",
    zIndex: 1,
    overflow: "hidden",
    transition: "none",
    background: "var(--reorder-background, var(--selected-background))",
    borderRadius: "var(--border-radius-m)",
    boxShadow: "0 2px 6px rgb(0 0 0 / 16%)",
  });
  root.append(ghost);
  ghost.showPopover?.();
  return ghost;
}

export function reorderMotion(
  root: HTMLElement,
  {
    axis,
    handleSelector,
    onMove,
    onEnd,
  }: {
    axis: "horizontal" | "vertical";
    handleSelector: string;
    onMove: (
      id: string,
      pointer: Point,
      center: Point,
      render: (update: () => void) => void,
    ) => void;
    onEnd: (id: string, canceled: boolean) => void;
  },
) {
  const horizontal = axis === "horizontal";
  const coordinate = (point: Point) => (horizontal ? point.x : point.y);
  const animations = motions.get(root) ?? new Map<HTMLElement, Animation>();
  motions.set(root, animations);
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  root.dataset.aidosReorderRoot = "";
  let pressed: {
    id: string;
    pointerId: number;
    start: Point;
    point: Point;
    source: HTMLElement;
  } | null = null;
  let ghost: HTMLElement | null = null;
  let lift: Animation | undefined;
  let opacity = "";
  let origin: DOMRect;
  let grab = 0;
  let frame = 0;
  let previousTime = 0;
  let dragging = false;
  let suppressClick = false;
  const find = (id: string) =>
    reorderItems(root).find((item) => item.dataset.aidosReorderItem === id);
  const focus = (element: HTMLElement) => {
    const handle = element?.querySelector<HTMLElement>(handleSelector);
    if (document.hasFocus()) handle?.focus({ preventScroll: true });
  };
  const render = (update: () => void, sourceId = pressed?.id) => {
    const sourceGroup = find(sourceId)?.closest("[data-aidos-reorder-group]");
    const groups = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>("[data-aidos-reorder-group]"),
      ).filter((group) => group.closest("[data-aidos-reorder-root]") === root);
    const before = new Map(
      [...groups(), ...reorderItems(root)].map((item) => [
        item,
        item.getBoundingClientRect(),
      ]),
    );
    animations.forEach((animation) => animation.cancel());
    animations.clear();
    flushSync(update);
    const destination = find(sourceId);
    const destinationGroup = destination?.closest("[data-aidos-reorder-group]");
    const box = destination?.getBoundingClientRect();
    if (reducedMotion.matches) return box;
    // Measure final layout before adding either group or row transforms.
    const after = new Map(
      [...groups(), ...reorderItems(root)].map((item) => [
        item,
        item.getBoundingClientRect(),
      ]),
    );
    const animate = (item: HTMLElement, x: number, y: number) => {
      if (x || y)
        animations.set(
          item,
          item.animate(
            [{ translate: `${x}px ${y}px` }, { translate: "0 0" }],
            transition,
          ),
        );
    };
    const shifts = new Map<Element, Point>();
    for (const group of groups()) {
      const previous = before.get(group);
      if (!previous) continue;
      const next = after.get(group)!;
      const shift = {
        x: previous.left - next.left,
        y: previous.top - next.top,
      };
      shifts.set(group, shift);
      animate(group, shift.x, shift.y);
    }
    for (const item of reorderItems(root)) {
      if (item === destination) continue;
      const group = item.closest("[data-aidos-reorder-group]");
      if (group !== sourceGroup && group !== destinationGroup) continue;
      const previous = before.get(item);
      if (!previous) continue;
      const next = after.get(item)!;
      const shift = shifts.get(group);
      // Unchanged groups move as one unit; changed rows animate only their local displacement.
      animate(
        item,
        previous.left - next.left - (shift?.x ?? 0),
        previous.top - next.top - (shift?.y ?? 0),
      );
    }
    return box;
  };
  const finish = (canceled: boolean) => {
    if (!pressed) return;
    const { source, id, pointerId } = pressed;
    const moved = dragging;
    let image = ghost!;
    const previousOpacity = opacity;
    const scale = getComputedStyle(image).scale;
    let translate = image.style.translate || "0px 0px";
    lift?.cancel();
    image.style.scale = scale;
    const released = image.getBoundingClientRect();
    pressed = null;
    ghost = null;
    dragging = false;
    cancelAnimationFrame(frame);
    if (root.hasPointerCapture(pointerId))
      root.releasePointerCapture(pointerId);
    if (canceled) suppressClick = true;
    const layout = moved ? render(() => onEnd(id, canceled), id) : undefined;
    delete root.dataset.aidosReordering;
    // A cross-group move replaces the React node; settle and focus its replacement.
    const destination = find(id) ?? source;
    const box = layout ?? destination.getBoundingClientRect();
    const transferred = destination !== source;
    const destinationOpacity = transferred
      ? destination.style.opacity
      : previousOpacity;
    if (transferred) {
      source.style.opacity = previousOpacity;
      image.remove();
      image = createReorderGhost(root, destination, box);
      image.style.scale = scale;
      const placed = image.getBoundingClientRect();
      // Preserve the release position while the new row settles into its slot.
      translate = `${released.left - placed.left}px ${released.top - placed.top}px`;
      image.style.translate = translate;
    }
    destination.style.opacity = "0";
    if (moved) focus(destination);
    let movement: Animation | undefined;
    let settle: Animation | undefined;
    let restored = false;
    const restore = () => {
      if (restored) return;
      restored = true;
      movement?.cancel();
      settle?.cancel();
      image.remove();
      destination.style.opacity = destinationOpacity;
      if (settling.get(root) === restore) settling.delete(root);
    };
    settling.set(root, restore);
    if (destination.isConnected && !reducedMotion.matches) {
      if (moved)
        movement = image.animate(
          [
            { translate },
            {
              translate: `${box.left - parseFloat(image.style.left)}px ${box.top - parseFloat(image.style.top)}px`,
            },
          ],
          { ...transition, fill: "forwards" },
        );
      settle = image.animate([{ scale }, { scale: "1" }], {
        duration: 160,
        easing: "ease-out",
        fill: "forwards",
      });
      void Promise.all([movement?.finished, settle.finished]).then(
        restore,
        restore,
      );
    } else restore();
  };
  const tick = (time: number) => {
    if (!pressed || !ghost || !dragging) return;
    if (!root.contains(pressed.source)) {
      finish(true);
      return;
    }
    const viewport = root.getBoundingClientRect();
    const start = horizontal ? viewport.left : viewport.top;
    const end = horizontal ? viewport.right : viewport.bottom;
    const size = horizontal ? origin.width : origin.height;
    const pointer = coordinate(pressed.point);
    const edge = Math.min(32, (end - start) / 4);
    const speed =
      pointer < start + edge
        ? -Math.min(1, (start + edge - pointer) / edge)
        : pointer > end - edge
          ? Math.min(1, (pointer - end + edge) / edge)
          : 0;
    const scroll = speed * Math.min(time - (previousTime || time), 32) * 0.6;
    if (horizontal) root.scrollLeft += scroll;
    else root.scrollTop += scroll;
    previousTime = time;
    const position = Math.max(start, Math.min(pointer - grab, end - size));
    ghost.style.translate = horizontal
      ? `${position - origin.left}px 0`
      : `0 ${position - origin.top}px`;
    const center = {
      x: origin.left + origin.width / 2,
      y: origin.top + origin.height / 2,
    };
    if (horizontal) center.x = position + size / 2;
    else center.y = position + size / 2;
    onMove(pressed.id, pressed.point, center, render);
    frame = requestAnimationFrame(tick);
  };
  const start = (event: PointerEvent) => {
    suppressClick = false;
    if (
      event.defaultPrevented ||
      !event.isPrimary ||
      event.button !== 0 ||
      event.ctrlKey ||
      pressed
    )
      return;
    const handle =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>(handleSelector)
        : null;
    const source = handle?.closest<HTMLElement>("[data-aidos-reorder-item]");
    if (
      !source ||
      !reorderItems(root).includes(source) ||
      handle?.getAttribute("aria-disabled") === "true"
    )
      return;
    settling.get(root)?.();
    origin = source.getBoundingClientRect();
    grab = horizontal
      ? event.clientX - origin.left
      : event.clientY - origin.top;
    opacity = source.style.opacity;
    const point = { x: event.clientX, y: event.clientY };
    pressed = {
      id: source.dataset.aidosReorderItem!,
      pointerId: event.pointerId,
      start: point,
      point,
      source,
    };
    ghost = createReorderGhost(root, source);
    source.style.opacity = "0";
    if (!reducedMotion.matches)
      lift = ghost.animate(
        [
          { scale: "1", easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
          {
            scale: "1.025",
            offset: 0.55,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          { scale: "1.015" },
        ],
        { duration: 180, fill: "forwards" },
      );
  };
  const drag = (event: PointerEvent) => {
    if (!pressed || event.pointerId !== pressed.pointerId) return;
    pressed.point = { x: event.clientX, y: event.clientY };
    if (!dragging) {
      if (Math.abs(coordinate(pressed.point) - coordinate(pressed.start)) < 5)
        return;
      dragging = true;
      root.dataset.aidosReordering = "";
      root.setPointerCapture(event.pointerId);
      suppressClick = true;
      previousTime = 0;
      frame = requestAnimationFrame(tick);
    }
    event.preventDefault();
  };
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  root.addEventListener("pointerdown", start, options);
  window.addEventListener("pointermove", drag, { ...options, passive: false });
  window.addEventListener(
    "pointerup",
    (event) => {
      if (event.pointerId !== pressed?.pointerId) return;
      cancelAnimationFrame(frame);
      tick(performance.now());
      finish(false);
    },
    options,
  );
  window.addEventListener(
    "pointercancel",
    (event) => {
      if (event.pointerId === pressed?.pointerId) finish(true);
    },
    options,
  );
  root.addEventListener("lostpointercapture", () => finish(true), options);
  window.addEventListener("blur", () => finish(true), options);
  window.addEventListener("resize", () => finish(true), options);
  window.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && pressed) {
        event.preventDefault();
        event.stopPropagation();
        finish(true);
      }
    },
    { ...options, capture: true },
  );
  root.addEventListener(
    "dragstart",
    (event) => event.preventDefault(),
    options,
  );
  root.addEventListener(
    "click",
    (event) => {
      if (suppressClick && event.detail !== 0) {
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressClick = false;
      }
    },
    { ...options, capture: true },
  );
  return () => {
    listeners.abort();
    cancelAnimationFrame(frame);
    if (pressed) {
      pressed.source.style.opacity = opacity;
      if (root.hasPointerCapture(pressed.pointerId))
        root.releasePointerCapture(pressed.pointerId);
    }
    lift?.cancel();
    ghost?.remove();
    settling.get(root)?.();
    animations.forEach((animation) => animation.cancel());
    animations.clear();
    delete root.dataset.aidosReordering;
    delete root.dataset.aidosReorderRoot;
  };
}
