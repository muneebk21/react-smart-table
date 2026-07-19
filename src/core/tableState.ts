import type { RowId } from "../types";

export type SortDirection = "asc" | "desc" | null;

export interface TableState {
    sort: {
        key: string | null;
        direction: SortDirection;
    };
    filters: Record<string, string>;
    pagination: {
        page: number;
        pageSize: number;
    };
    loading: boolean;
    selectedRowIds: Set<RowId>;
}

export function createInitialTableState(pageSize: number): TableState {
    return {
        sort: { key: null, direction: null },
        filters: {},
        pagination: {
            page: 1,
            pageSize,
        },
        loading: false,
        selectedRowIds: new Set(),
    };
}