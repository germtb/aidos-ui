export function queryFocusables(root) {
    const focusables = Array.from(root.querySelectorAll("button,input,textarea,a,[tabindex='0'],[tabindex='-1']"));
    return focusables.filter((element) => !element["disabled"]);
}
export function queryGrid(root) {
    const rows = Array.from(root.querySelectorAll('li[role="row"]'));
    const rowsWithColumns = rows
        .map((row) => Array.from(queryFocusables(row)))
        .filter((row) => row.length > 0);
    return rowsWithColumns;
}
export const normalizeGrid = (rows, rowIndex, columnIndex) => {
    for (const row of rows) {
        for (const column of row) {
            column.tabIndex = -1;
        }
    }
    const row = rows[rowIndex];
    const column = row[columnIndex] ?? row[row.length - 1];
    column.tabIndex = 0;
};
export const focusGridElement = (rows, rowIndex, columnIndex) => {
    normalizeGrid(rows, rowIndex, columnIndex);
    const row = rows[rowIndex];
    const column = row[columnIndex] ?? row[row.length - 1];
    column.focus();
    column.scrollIntoView(false);
};
export const normalizeElements = (focusables, index) => {
    for (const element of focusables) {
        element.tabIndex = -1;
    }
    const element = focusables[index] ?? focusables[focusables.length - 1];
    element.tabIndex = 0;
};
export const focusElement = (focusables, index) => {
    normalizeElements(focusables, index);
    const element = focusables[index] ?? focusables[focusables.length - 1];
    element.focus();
    element.scrollIntoView(false);
};
//# sourceMappingURL=aria.js.map