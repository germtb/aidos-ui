import React, { useCallback, useRef, useEffect } from "react";
import queryFocusables from "./queryFocusables";
import BaseList, { BaseListProps } from "./BaseList";

function queryRows(root: HTMLElement): HTMLElement[][] {
  const rows: HTMLLIElement[] = Array.from(
    root.querySelectorAll('li[role="row"]')
  );

  for (const row of rows) {
    // @ts-ignore
    if (row.role !== "row") {
      console.error("Incorrect aria in row: ", row);
    }
  }

  const rowsWithColumns = rows
    .map((row) => Array.from(queryFocusables(row)))
    .filter((row) => row.length > 0);

  return rowsWithColumns;
}

const focus = (
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
  column.focus();
  column.scrollIntoView(false);
};

const PAGE_SIZE = 5;

interface ListProps extends BaseListProps {
  ariaLabel: string;
  role?: undefined;
}

export default function List({ ariaLabel, jsStyle, ...otherProps }: ListProps) {
  const isEditingRef = useRef<boolean>(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const refCallback = useCallback((root: HTMLUListElement | null) => {
    if (root === null) {
      return;
    }

    rootRef.current = root;
    const rows = queryRows(root);

    for (const row of rows) {
      for (const column of row) {
        column.tabIndex = -1;
      }
    }

    const row = rows[0];

    if (!row) {
      return;
    }

    const column = row[0] ?? row[row.length - 1];

    if (!column) {
      return;
    }

    column.tabIndex = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditingRef.current) {
        return;
      }

      const rows = queryRows(root);

      if (!rows) {
        return;
      }

      const rowIndex = rows.findIndex(
        (row) => row.filter((focusable) => focusable.tabIndex === 0).length > 0
      );

      const row = rows[rowIndex];

      if (!row) {
        return;
      }

      const columnIndex = row.findIndex(
        (focusable) => focusable.tabIndex === 0
      );

      if (e.code === "Home") {
        if (e.metaKey || e.ctrlKey) {
          if (columnIndex > 0 || rowIndex > 0) {
            focus(rows, 0, 0);
            e.preventDefault();
          }
        } else if (columnIndex > 0) {
          focus(rows, rowIndex, 0);
          e.preventDefault();
        }
      } else if (e.code === "End") {
        if (e.metaKey || e.ctrlKey) {
          if (rowIndex < rows.length - 1 || rows[rows.length - 1].length - 1) {
            focus(rows, rows.length - 1, rows[rows.length - 1].length - 1);
            e.preventDefault();
          }
        } else if (columnIndex < rows[rowIndex].length - 1) {
          focus(rows, rowIndex, rows[rowIndex].length - 1);
        }
      } else if (e.code === "PageDown") {
        if (rowIndex < rows.length - 1) {
          focus(
            rows,
            rowIndex + PAGE_SIZE > rows.length - 1
              ? rows.length - 1
              : rowIndex + PAGE_SIZE,
            columnIndex
          );
          e.preventDefault();
        }
      } else if (e.code === "PageUp") {
        if (rowIndex > 0) {
          focus(
            rows,
            rowIndex - PAGE_SIZE < 0 ? 0 : rowIndex - PAGE_SIZE,
            columnIndex
          );
          e.preventDefault();
        }
      } else if (e.code === "ArrowLeft") {
        if (columnIndex === 0 && rowIndex > 0) {
          focus(rows, rowIndex - 1, rows[rowIndex - 1].length - 1);
          e.preventDefault();
        } else if (columnIndex > 0) {
          focus(rows, rowIndex, columnIndex - 1);
          e.preventDefault();
        }
      } else if (e.code === "ArrowUp") {
        if (e.metaKey || e.ctrlKey) {
          if (rowIndex > 0) {
            focus(rows, 0, columnIndex);
            e.preventDefault();
          }
        } else {
          if (rowIndex <= 0) {
            focus(rows, rows.length - 1, columnIndex);
            e.preventDefault();
          } else {
            focus(rows, rowIndex - 1, columnIndex);
            e.preventDefault();
          }
        }
      } else if (e.code === "ArrowRight") {
        if (
          columnIndex >= rows[rowIndex].length - 1 &&
          rowIndex < rows.length - 1
        ) {
          focus(rows, rowIndex + 1, 0);
          e.preventDefault();
        } else if (columnIndex < rows[rowIndex].length - 1) {
          focus(rows, rowIndex, columnIndex + 1);
          e.preventDefault();
        }
      } else if (e.code === "ArrowDown") {
        if (e.metaKey || e.ctrlKey) {
          if (rowIndex < rows.length - 1) {
            focus(rows, rows.length - 1, columnIndex);
            e.preventDefault();
          }
        } else {
          if (rowIndex >= rows.length - 1) {
            focus(rows, 0, columnIndex);
            e.preventDefault();
          } else {
            focus(rows, rowIndex + 1, columnIndex);
            e.preventDefault();
          }
        }
      }
    };

    root.addEventListener("keydown", onKeyDown);

    unsubscribeRef.current = () => {
      root.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      const { current } = unsubscribeRef;

      if (current) {
        current();
      }
    };
  }, []);

  return (
    <BaseList
      role="grid"
      aria-label={ariaLabel}
      ref={refCallback}
      jsStyle={jsStyle}
      {...otherProps}
    />
  );
}
