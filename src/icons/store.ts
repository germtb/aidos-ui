import { bucket } from "./bucket";
import { loaders } from "./loaders";

interface IconData {
  body: string;
  width?: number;
  height?: number;
}

const icons = new Map<string, IconData>();
const preloaded = new Map<string, IconData>();
const listeners = new Map<string, Set<() => void>>();
const loading = new Set<number>();

export function install(
  data: Record<string, IconData | string>,
  eager = false,
) {
  for (const [name, value] of Object.entries(data)) {
    // Generated aliases point directly to a canonical entry in the same chunk.
    const icon =
      icons.get(name) ??
      (typeof value === "string" ? (data[value] as IconData) : value);
    if (eager) preloaded.set(name, icon);
    if (icons.has(name)) continue;
    icons.set(name, icon);
    listeners.get(name)?.forEach((listener) => listener());
  }
}

export const getIcon = (name: string) => icons.get(name);
export const getServerIcon = (name: string) => preloaded.get(name);

export function subscribe(name: string, listener: () => void) {
  if (icons.has(name)) return () => {};
  let subscribers = listeners.get(name);
  if (!subscribers) listeners.set(name, (subscribers = new Set()));
  subscribers.add(listener);
  const index = bucket(name);
  if (!loading.has(index)) {
    loading.add(index);
    loaders[index]()
      .then((module) => install(module.default))
      .catch(() => loading.delete(index));
  }
  return () => {
    subscribers.delete(listener);
    if (!subscribers.size) listeners.delete(name);
  };
}
