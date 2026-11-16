import { createContext, type RefObject } from "react";

export const PopoverNavigationContext = createContext<{
  root: RefObject<HTMLElement | null>;
  pages: readonly string[];
  open: (id: string, opener: HTMLElement) => void;
  back: () => void;
}>(null);
