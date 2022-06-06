import React, { useCallback, useRef, useEffect } from "react";
import { focusGridElement, normalizeGrid, queryGrid } from "./aria";
import { BaseList, BaseListProps } from "./BaseList";

const PAGE_SIZE = 5;

interface ListProps extends BaseListProps {
  ariaLabel: string;
  autofocus?: boolean;
  role?: undefined;
}

export function List({
  ariaLabel,
  jsStyle,
  autofocus = false,
  ...otherProps
}: ListProps) {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const refCallback = useCallback(
    (root: HTMLUListElement | null) => {
      if (root === null) {
        return;
      }

      let rowIndex = 0;
      let columnIndex = 0;

      {
        const grid = queryGrid(root);

        if (grid.length !== 0) {
          autofocus
            ? focusGridElement(grid, rowIndex, columnIndex)
            : normalizeGrid(grid, rowIndex, columnIndex);
        }
      }

      const onKeyDown = (e: KeyboardEvent) => {
        const grid = queryGrid(root);

        if (grid.length === 0) {
          return;
        }

        let newRowIndex: number = -1;
        let newColumnIndex: number = -1;

        if (e.code === "Home") {
          if (e.metaKey || e.ctrlKey) {
            if (columnIndex > 0 || rowIndex > 0) {
              newRowIndex = 0;
              newColumnIndex = 0;
            }
          } else if (columnIndex > 0) {
            newRowIndex = rowIndex;
            newColumnIndex = 0;
          }
        } else if (e.code === "End") {
          if (e.metaKey || e.ctrlKey) {
            if (
              rowIndex < grid.length - 1 ||
              grid[grid.length - 1].length - 1
            ) {
              newRowIndex = grid.length - 1;
              newColumnIndex = grid[grid.length - 1].length - 1;
            }
          } else if (columnIndex < grid[rowIndex].length - 1) {
            newRowIndex = rowIndex;
            newColumnIndex = grid[rowIndex].length - 1;
          }
        } else if (e.code === "PageDown") {
          if (rowIndex < grid.length - 1) {
            newRowIndex =
              rowIndex + PAGE_SIZE > grid.length - 1
                ? grid.length - 1
                : rowIndex + PAGE_SIZE;
            newColumnIndex = columnIndex;
          }
        } else if (e.code === "PageUp") {
          if (rowIndex > 0) {
            newRowIndex = rowIndex - PAGE_SIZE < 0 ? 0 : rowIndex - PAGE_SIZE;
            newColumnIndex = columnIndex;
          }
        } else if (e.code === "ArrowLeft") {
          if (columnIndex === 0 && rowIndex > 0) {
            newRowIndex = rowIndex - 1;
            newColumnIndex = grid[rowIndex - 1].length - 1;
          } else if (columnIndex > 0) {
            newRowIndex = rowIndex;
            newColumnIndex = columnIndex - 1;
          }
        } else if (e.code === "ArrowUp") {
          if (e.metaKey || e.ctrlKey) {
            if (rowIndex > 0) {
              newRowIndex = 0;
              newColumnIndex = columnIndex;
            }
          } else {
            if (rowIndex <= 0) {
              newRowIndex = grid.length - 1;
              newColumnIndex = columnIndex;
            } else {
              newRowIndex = rowIndex - 1;
              newColumnIndex = columnIndex;
            }
          }
        } else if (e.code === "ArrowRight") {
          if (
            columnIndex >= grid[rowIndex].length - 1 &&
            rowIndex < grid.length - 1
          ) {
            newRowIndex = rowIndex + 1;
            newColumnIndex = 0;
          } else if (columnIndex < grid[rowIndex].length - 1) {
            newRowIndex = rowIndex;
            newColumnIndex = columnIndex + 1;
          }
        } else if (e.code === "ArrowDown") {
          if (e.metaKey || e.ctrlKey) {
            if (rowIndex < grid.length - 1) {
              newRowIndex = grid.length - 1;
              newColumnIndex = columnIndex;
            }
          } else {
            if (rowIndex >= grid.length - 1) {
              newRowIndex = 0;
              newColumnIndex = columnIndex;
            } else {
              newRowIndex = rowIndex + 1;
              newColumnIndex = columnIndex;
            }
          }
        }

        if (
          newRowIndex !== -1 &&
          newColumnIndex !== -1 &&
          (rowIndex !== newRowIndex || columnIndex !== newColumnIndex)
        ) {
          rowIndex = newRowIndex;
          columnIndex = newColumnIndex;
          focusGridElement(grid, rowIndex, columnIndex);
          e.preventDefault();
        }
      };

      root.addEventListener("keydown", onKeyDown);

      const observer = new MutationObserver((mutationList) => {
        if (mutationList.filter((m) => m.type === "childList").length > 0) {
          const grid = queryGrid(root);
          normalizeGrid(grid, rowIndex, columnIndex);
        }
      });
      observer.observe(root, { childList: true });

      unsubscribeRef.current = () => {
        root.removeEventListener("keydown", onKeyDown);
        observer.disconnect();
      };
    },
    [otherProps.children]
  );

  useEffect(() => {
    return () => unsubscribeRef.current && unsubscribeRef.current();
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
