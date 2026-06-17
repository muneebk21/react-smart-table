import { type InternalColumn } from '../types';

interface SmartTableBodyProps<T> {
    data: T[];
    columns: InternalColumn<T>[];
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    columnWidths?: Record<string, number>,
}

function alignClass(align?: 'left' | 'center' | 'right') {
    return `rst-td--align-${align || 'left'}`;
}

function EmptyIcon() {
    return (
        <svg
            className="rst-empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 12h18M3 17h18"
            />
        </svg>
    );
}

export function SmartTableBody<T>({
    data,
    columns,
    onRowClick,
    emptyMessage = 'No data available',
    columnWidths = {},
}: SmartTableBodyProps<T>) {
    if (data.length === 0) {
        return (
            <tbody className="rst-tbody">
                <tr className="rst-tr">
                    <td style={{ width: columnWidths[columns[0]?.id] ?? 150 }} className="rst-empty" colSpan={columns.length}>
                        <EmptyIcon />
                        {emptyMessage}
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="rst-tbody">
            {data.map((row, index) => (
                <tr
                    key={index}
                    className={['rst-tr', onRowClick ? 'rst-tr--clickable' : '']
                        .filter(Boolean)
                        .join(' ')}
                    onClick={() => onRowClick?.(row)}
                >
                    {columns.map((column) => (
                        <td
                            style={{ width: columnWidths[column.id] ?? column.width ?? 150 }}
                            key={String(column.key)}
                            className={['rst-td', alignClass(column.align)].join(' ')}
                        >
                            {column.render
                                ? column.render(row[column.key as keyof T], row)
                                : String(row[column.key as keyof T] ?? '')}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
