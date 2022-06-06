type Focusable = HTMLButtonElement | HTMLInputElement;

export function queryFocusables(root: HTMLElement): Focusable[] {
  const focusables: Focusable[] = Array.from(
    root.querySelectorAll("button,input,textarea,a")
  );

  return focusables.filter((element: Focusable) => !element.disabled);
}

export function queryGrid(root: HTMLElement): HTMLElement[][] {
  const rows: HTMLLIElement[] = Array.from(
    root.querySelectorAll('li[role="row"]')
  );

  const rowsWithColumns = rows
    .map((row) => Array.from(queryFocusables(row)))
    .filter((row) => row.length > 0);

  return rowsWithColumns;
}

export const normalizeGrid = (
  rows: HTMLElement[][],
  rowIndex: number,
  columnIndex: number
): void => {
  for (const row of rows) {
    for (const column of row) {
      column.tabIndex = -1;
    }
  }

  const row = rows[rowIndex];
  const column = row[columnIndex] ?? row[row.length - 1];
  column.tabIndex = 0;
};

export const focusGridElement = (
  rows: HTMLElement[][],
  rowIndex: number,
  columnIndex: number
): void => {
  normalizeGrid(rows, rowIndex, columnIndex);
  const row = rows[rowIndex];
  const column = row[columnIndex] ?? row[row.length - 1];
  column.focus();
  column.scrollIntoView(false);
};

export const normalizeElements = (
  focusables: HTMLElement[],
  index: number
): void => {
  for (const element of focusables) {
    element.tabIndex = -1;
  }
  const element = focusables[index] ?? focusables[focusables.length - 1];
  element.tabIndex = 0;
};

export const focusElement = (
  focusables: HTMLElement[],
  index: number
): void => {
  normalizeElements(focusables, index);
  const element = focusables[index] ?? focusables[focusables.length - 1];
  element.focus();
  element.scrollIntoView(false);
};
