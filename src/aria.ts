type Focusable = HTMLElement;

export function queryFocusables(root: ParentNode): Focusable[] {
  // aria-disabled actions remain discoverable through keyboard navigation.
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button, input, textarea, select, a[href], [tabindex], [contenteditable="true"]',
    ),
  ).filter(
    (element) =>
      !element.matches(':disabled, input[type="hidden"]') &&
      !element.closest("[inert], [hidden]") &&
      element.getClientRects().length > 0 &&
      getComputedStyle(element).visibility !== "hidden",
  );
}

export function queryGrid(root: HTMLElement): HTMLElement[][] {
  return Array.from(root.querySelectorAll('li[role="row"]'))
    .map(queryFocusables)
    .filter((row) => row.length > 0);
}

export function normalizeGrid(
  rows: HTMLElement[][],
  rowIndex: number,
  columnIndex: number,
): void {
  const row = rows[rowIndex];
  if (!row) return;
  normalizeElements(
    rows.flat(),
    rows.flat().indexOf(row[columnIndex] ?? row[row.length - 1]),
  );
}

export function focusGridElement(
  rows: HTMLElement[][],
  rowIndex: number,
  columnIndex: number,
): void {
  normalizeGrid(rows, rowIndex, columnIndex);
  const row = rows[rowIndex];
  (row?.[columnIndex] ?? row?.[row.length - 1])?.focus();
}

export function normalizeElements(
  elements: HTMLElement[],
  index: number,
): void {
  const selected = elements[Math.max(0, Math.min(index, elements.length - 1))];
  for (const element of elements)
    element.tabIndex = element === selected ? 0 : -1;
}

export function focusElement(elements: HTMLElement[], index: number): void {
  normalizeElements(elements, index);
  elements.find((element) => element.tabIndex === 0)?.focus();
}
