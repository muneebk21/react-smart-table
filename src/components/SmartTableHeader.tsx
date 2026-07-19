import { useEffect, useRef } from 'react';
import { type InternalColumn, type SortConfig } from '../types';

interface SmartTableHeaderProps<T> {
    columns: InternalColumn<T>[];
    sortable?: boolean;
    sortConfig?: SortConfig | null;
    onSort?: (key: string) => void;
    filterable?: boolean;
    filters?: Record<string, string>;
    onFilter?: (key: string, value: string) => void;
    selectable?: boolean;
    allSelected?: boolean;
    someSelected?: boolean;
    onToggleAll?: () => void;
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

function getColumnWidth<T>(column: InternalColumn<T>): number {
    if (typeof column.width === 'number') return column.width;
    if (typeof column.width === 'string') {
        const parsed = Number.parseFloat(column.width);
        if (!Number.isNaN(parsed)) return parsed;
    }
    return 150;
}

export function SmartTableHeader<T>({
    columns,
    sortable,
    sortConfig,
    onSort,
    filterable,
    filters,
    onFilter,
    selectable,
    allSelected,
    someSelected,
    onToggleAll,
}: SmartTableHeaderProps<T>) {
    const selectAllRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = !allSelected && Boolean(someSelected);
        }
    }, [allSelected, someSelected]);

    return (
        <thead className="rst-thead">
            <tr>
                {selectable && (
                    <th className="rst-th rst-th--checkbox">
                        <input
                            ref={selectAllRef}
                            type="checkbox"
                            className="rst-checkbox"
                            checked={Boolean(allSelected)}
                            onChange={onToggleAll}
                            aria-label="Select all rows"
                        />
                    </th>
                )}
                {columns.map((column) => {
                    const key = String(column.key);
                    const isSortable = Boolean(sortable && column.sortable);
                    const isSorted = sortConfig?.key === column.key;
                    const width = getColumnWidth(column);
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
                            data-column-key={column.id}
                            style={{ width }}
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
                                        direction={isSorted ? sortConfig?.direction : undefined}
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
