import type { Column } from "../types";

export const useNormalizedColumns = <T>(columns: Column<T>[]) => {
    return columns.map((col) => ({
        ...col,
        id: String(col.key),
        width: col.width ?? 150,
        minWidth: col.minWidth ?? 80,
    }));
}