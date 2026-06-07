export interface Column<T = any> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string | number;
    align?: 'left' | 'center' | 'right';
    render?: (value: any, row: T) => React.ReactNode;
}

export interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
}

export interface FilterConfig {
    [key: string]: string;
}

export interface PaginationConfig {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface SmartTableProps<T = any> {
    data: T[];
    columns: Column<T>[];
    sortable?: boolean;
    filterable?: boolean;
    pagination?: boolean;
    itemsPerPage?: number;
    className?: string;
    style?: React.CSSProperties;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}