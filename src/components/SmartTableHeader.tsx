import React from 'react';
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
        <thead>
            <tr>
                {columns.map((column) => (
                    <th
                        key={String(column.key)}
                        style={{
                            width: column.width,
                            textAlign: column.align || 'left',
                            cursor: sortable && column.sortable ? 'pointer' : 'default'
                        }}
                        onClick={() => {
                            if (sortable && column.sortable && onSort) {
                                onSort(String(column.key));
                            }
                        }}
                    >
                        <div>
                            {column.header}
                            {sortConfig?.key === column.key && (
                                <span style={{ marginLeft: '8px' }}>
                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </div>

                        {filterable && column.filterable && onFilter && (
                            <input
                                type="text"
                                placeholder={`Filter ${column.header}`}
                                value={filters?.[String(column.key)] || ''}
                                onChange={(e) => onFilter(String(column.key), e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                style={{ marginTop: '8px', width: '100%' }}
                            />
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
}