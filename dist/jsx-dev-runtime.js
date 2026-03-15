// Custom JSX dev runtime that injects <!-- ComponentName --> comments
// into the DOM at component boundaries.
//
// Usage: in tsconfig.json, set "jsxImportSource": "aidos-ui/src"
// (or wherever this file is importable from)
export { Fragment } from "react/jsx-dev-runtime";
import { jsxDEV as _jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { JSSComment } from "./JSSComment";
const wrapCache = new WeakMap();
function getWrapped(type) {
    let wrapped = wrapCache.get(type);
    if (wrapped)
        return wrapped;
    const name = type.displayName || type.name;
    wrapped = function JSSBoundary(props) {
        return _jsxDEV(Fragment, {
            children: [
                _jsxDEV(JSSComment, { name }, undefined, false, undefined, undefined),
                _jsxDEV(type, props, undefined, false, undefined, undefined),
            ],
        }, undefined, true, undefined, undefined);
    };
    wrapped.displayName = name;
    wrapCache.set(type, wrapped);
    return wrapped;
}
// Skip framework internals and our own components
const SKIP_NAMES = new Set([
    "JSSComment",
    "JSSBoundary",
    // Next.js internals
    "Document",
    "Html",
    "Head",
    "Main",
    "NextScript",
    "App",
    "InnerLayoutRouter",
    "OuterLayoutRouter",
]);
function isComponent(type) {
    if (typeof type !== "function")
        return false;
    const name = type.displayName || type.name;
    if (!name || !/^[A-Z]/.test(name))
        return false;
    if (SKIP_NAMES.has(name))
        return false;
    // Skip if it comes from node_modules (framework code)
    if (type.__module && type.__module.includes("node_modules"))
        return false;
    return true;
}
export function jsxDEV(type, props, key, isStaticChildren, source, self) {
    if (isComponent(type)) {
        return _jsxDEV(getWrapped(type), props, key, isStaticChildren, source, self);
    }
    return _jsxDEV(type, props, key, isStaticChildren, source, self);
}
//# sourceMappingURL=jsx-dev-runtime.js.map