export interface Column<T> {
    key: keyof T | string | number | symbol;
    header: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string | number;
    minWidth?: number;
    maxWidth?: number;
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
}