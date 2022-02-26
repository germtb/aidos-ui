type Focusable = HTMLButtonElement | HTMLInputElement;

export default function queryFocusables(root: HTMLElement): Focusable[] {
  const focusables: Focusable[] = Array.from(
    root.querySelectorAll("button,input,textarea,a")
  );

  return focusables.filter((element: Focusable) => !element.disabled);
}
