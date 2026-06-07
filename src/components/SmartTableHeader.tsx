import { type Column, type SortConfig } from '../types';

interface SmartTableHeaderProps<T> {
    columns: Column<T>[];
    sortable?: boolean;
    sortConfig?: SortConfig | null;
    onSort?: (key: string) => void;
    filterable?: boolean;
    filters?: Record<string, string>;
    onFilter?: (key: string, value: string) => void;
}

function SortIcon({ direction }: { direction?: 'asc' | 'desc' }) {
    const className = [
        'rst-sort-icon',
        direction === 'asc' ? 'rst-sort-icon--asc' : '',
        direction === 'desc' ? 'rst-sort-icon--desc' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <span className={className} aria-hidden="true">
            <span className="rst-sort-icon-up" />
            <span className="rst-sort-icon-down" />
        </span>
    );
}

function alignClass(align?: 'left' | 'center' | 'right') {
    return `rst-th--align-${align || 'left'}`;
}

export function SmartTableHeader<T>({
    columns,
    sortable,
    sortConfig,
    onSort,
    filterable,
    filters,
    onFilter,
}: SmartTableHeaderProps<T>) {
    return (
        <thead className="rst-thead">
            <tr>
                {columns.map((column) => {
                    const key = String(column.key);
                    const isSortable = Boolean(sortable && column.sortable);
                    const isSorted = sortConfig?.key === column.key;
                    const thClassName = [
                        'rst-th',
                        alignClass(column.align),
                        isSortable ? 'rst-th--sortable' : '',
                        isSorted ? 'rst-th--sorted' : '',
                    ]
                        .filter(Boolean)
                        .join(' ');

                    return (
                        <th
                            key={key}
                            className={thClassName}
                            style={{ width: column.width }}
                            onClick={() => {
                                if (isSortable && onSort) {
                                    onSort(key);
                                }
                            }}
                            aria-sort={
                                isSorted
                                    ? sortConfig?.direction === 'asc'
                                        ? 'ascending'
                                        : 'descending'
                                    : isSortable
                                      ? 'none'
                                      : undefined
                            }
                        >
                            <div className="rst-th-content">
                                <span>{column.header}</span>
                                {isSortable && (
                                    <SortIcon
                                        direction={
                                            isSorted ? sortConfig?.direction : undefined
                                        }
                                    />
                                )}
                            </div>

                            {filterable && column.filterable && onFilter && (
                                <input
                                    type="text"
                                    className="rst-filter"
                                    placeholder={`Filter ${column.header}`}
                                    value={filters?.[key] || ''}
                                    onChange={(e) => onFilter(key, e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label={`Filter by ${column.header}`}
                                />
                            )}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}
