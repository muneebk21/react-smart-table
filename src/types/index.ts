export type RowId = string | number;

export interface Column<T> {
    key: keyof T | string | number | symbol;
    header: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string | number;
    minWidth?: number;
    align?: 'left' | 'center' | 'right';
    render?: (value: unknown, row: T) => React.ReactNode;
}

export interface InternalColumn<T> extends Column<T> {
    id: string;
}

export interface SortConfig {
    key: string | null;
    direction: 'asc' | 'desc' | null;
}

export interface FilterConfig {
    [key: string]: string;
}

export interface PaginationConfig {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

import type { TableThemeInput } from '../theme';

export interface SmartTableProps<T> {
    data: T[];
    columns: Column<T>[];
    sortable?: boolean;
    filterable?: boolean;
    pagination?: boolean;
    itemsPerPage?: number;
    theme?: TableThemeInput;
    className?: string;
    style?: React.CSSProperties;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;

    /** Enables the select-all header checkbox and a per-row checkbox column. */
    selectable?: boolean;
    /**
     * Identifies a row for selection. `index` is the row's position in the
     * `data` array you passed in (not its position on the current page).
     * Defaults to `row.id` when present, otherwise falls back to `index`.
     */
    getRowId?: (row: T, index: number) => RowId;
    onSelectionChange?: (selectedRowIds: RowId[], selectedRows: T[]) => void;
    /** Rendered inside the bulk-action toolbar that appears while rows are selected. */
    renderBulkActions?: (selection: {
        selectedRowIds: RowId[];
        selectedRows: T[];
        clearSelection: () => void;
    }) => React.ReactNode;
}