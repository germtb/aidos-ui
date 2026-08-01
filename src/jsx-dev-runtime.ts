// Custom JSX dev runtime that injects <!-- ComponentName --> comments
// into the DOM at component boundaries.
//
// Usage: in tsconfig.json, set "jsxImportSource": "aidos-ui/src"
// (or wherever this file is importable from)

export { Fragment } from "react/jsx-dev-runtime";
export type { JSX } from "react/jsx-dev-runtime";
import {
  jsxDEV as _jsxDEV,
  Fragment,
  type JSXSource,
} from "react/jsx-dev-runtime";
import type { ComponentType, ElementType, Key } from "react";
import { JSSComment } from "./JSSComment";

type DebugComponent = ComponentType & {
  displayName?: string;
  readonly name: string;
};

const wrapCache = new WeakMap<DebugComponent, DebugComponent>();

function getWrapped(type: DebugComponent): DebugComponent {
  let wrapped = wrapCache.get(type);
  if (wrapped) return wrapped;

  const name = type.displayName || type.name;

  wrapped = function JSSBoundary(props: unknown) {
    return _jsxDEV(
      Fragment,
      {
        children: [
          _jsxDEV(JSSComment, { name }, undefined, false, undefined, undefined),
          _jsxDEV(type as ElementType, props, undefined, false, undefined, undefined),
        ],
      },
      undefined,
      true,
      undefined,
      undefined
    );
  };

  wrapped.displayName = name;
  wrapCache.set(type, wrapped);

  return wrapped;
}

// Skip our own wrapper components by name
const SKIP_NAMES = new Set(["JSSComment", "JSSBoundary"]);

function isUserComponent(
  type: unknown,
  source: JSXSource | undefined,
): type is DebugComponent {
  if (typeof type !== "function") return false;
  const component = type as DebugComponent;
  const name = component.displayName || component.name;
  if (!name || !/^[A-Z]/.test(name)) return false;
  if (SKIP_NAMES.has(name)) return false;
  // Use the source fileName from the JSX transform to skip node_modules
  if (source?.fileName?.includes("node_modules")) return false;
  return true;
}

export function jsxDEV(
  type: ElementType,
  props: unknown,
  key: Key | undefined,
  isStaticChildren: boolean,
  source?: JSXSource,
  self?: unknown,
) {
  if (isUserComponent(type, source)) {
    return _jsxDEV(
      getWrapped(type),
      props,
      key,
      isStaticChildren,
      source,
      self
    );
  }

  return _jsxDEV(type, props, key, isStaticChildren, source, self);
}
