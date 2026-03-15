// Custom JSX dev runtime that injects <!-- ComponentName --> comments
// into the DOM at component boundaries.
//
// Usage: in tsconfig.json, set "jsxImportSource": "aidos-ui/src"
// (or wherever this file is importable from)

export { Fragment } from "react/jsx-dev-runtime";
import { jsxDEV as _jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { JSSComment } from "./JSSComment";

const wrapCache = new WeakMap<Function, Function>();

function getWrapped(type: Function): Function {
  let wrapped = wrapCache.get(type);
  if (wrapped) return wrapped;

  const name = (type as any).displayName || type.name;

  wrapped = function JSSBoundary(props: any) {
    return _jsxDEV(
      Fragment,
      {
        children: [
          _jsxDEV(JSSComment, { name }, undefined, false, undefined, undefined),
          _jsxDEV(type as any, props, undefined, false, undefined, undefined),
        ],
      },
      undefined,
      true,
      undefined,
      undefined
    );
  };

  (wrapped as any).displayName = name;
  wrapCache.set(type, wrapped);

  return wrapped;
}

// Skip our own wrapper components by name
const SKIP_NAMES = new Set(["JSSComment", "JSSBoundary"]);

function isUserComponent(type: any, source: any): boolean {
  if (typeof type !== "function") return false;
  const name = type.displayName || type.name;
  if (!name || !/^[A-Z]/.test(name)) return false;
  if (SKIP_NAMES.has(name)) return false;
  // Use the source fileName from the JSX transform to skip node_modules
  if (source?.fileName?.includes("node_modules")) return false;
  return true;
}

export function jsxDEV(
  type: any,
  props: any,
  key: any,
  isStaticChildren: boolean,
  source: any,
  self: any
) {
  if (isUserComponent(type, source)) {
    return _jsxDEV(
      getWrapped(type) as any,
      props,
      key,
      isStaticChildren,
      source,
      self
    );
  }

  return _jsxDEV(type, props, key, isStaticChildren, source, self);
}
