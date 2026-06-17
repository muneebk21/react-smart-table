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
    columnWidths: Record<string, number>;
    columnOrder: string[];
}

export function createInitialTableState(
    pageSize: number,
    columnKeys: string[]
): TableState {
    return {
        sort: { key: null, direction: null },
        filters: {},
        pagination: {
            page: 1,
            pageSize,
        },
        loading: false,
        columnWidths: {},
        columnOrder: columnKeys,
    };
}