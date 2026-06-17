import { useState } from 'react';
import { type InternalColumn, type SortConfig } from '../types';

interface SmartTableHeaderProps<T> {
    columns: InternalColumn<T>[];
    sortable?: boolean;
    sortConfig?: SortConfig | null;
    onSort?: (key: string) => void;
    filterable?: boolean;
    resizeable?: boolean;
    filters?: Record<string, string>;
    onFilter?: (key: string, value: string) => void;
    columnWidths?: Record<string, number>,
    startResize?: (key: string, startX: number, currentWidth: number) => void,
}

function SortIcon({ direction }: { direction?: 'asc' | 'desc' | null | undefined }) {
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
    resizeable,
    onFilter,
    columnWidths = {},
    startResize,
}: SmartTableHeaderProps<T>) {

    const [resizingColumn, setResizingColumn] = useState<string | null>(null);
    const onResizeStart = (e: React.MouseEvent, key: string) => {
        if (!resizeable) return;
        const startX = e.clientX;
        const currentWidth =
            columnWidths[key] ?? 150;
        setResizingColumn(key);
        if (startResize)
            startResize(key, startX, currentWidth);
    };

    const onGlobalMouseUp = () => {
        setResizingColumn(null);
    };

    useState(() => {
        document.addEventListener('mouseup', onGlobalMouseUp);
        return () => {
            document.removeEventListener('mouseup', onGlobalMouseUp);
        };
    });

    return (
        <thead className="rst-thead">
            <tr>
                {columns.map((column) => {
                    const key = String(column.key);
                    const isSortable = Boolean(sortable && column.sortable);
                    const isSorted = sortConfig?.key === column.key;
                    const thClassName = [
                        'rst-th',
                        resizeable && resizingColumn === column.key && 'rst-resizer',
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
                            style={{ width: columnWidths[column.id] ?? column.width ?? 150 }}
                            onClick={() => {
                                if (isSortable && onSort) {
                                    onSort(key);
                                }
                            }}
                            onMouseDown={(e) => onResizeStart(e, column.id)}
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
