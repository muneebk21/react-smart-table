import React from 'react';
import { type Column } from '../types';

interface SmartTableBodyProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}

export function SmartTableBody<T>({
    data,
    columns,
    onRowClick,
    emptyMessage = 'No data available',
}: SmartTableBodyProps<T>) {
    if (data.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px' }}>
                        {emptyMessage}
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {data.map((row, index) => (
                <tr
                    key={index}
                    onClick={() => onRowClick?.(row)}
                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                    {columns.map((column) => (
                        <td
                            key={String(column.key)}
                            style={{
                                textAlign: column.align || 'left',
                                padding: '12px'
                            }}
                        >
                            {column.render
                                ? column.render(row[column.key as keyof T], row)
                                : String(row[column.key as keyof T] || '')}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}